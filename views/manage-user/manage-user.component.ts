import { Component, OnInit, ViewChild, Injector } from '@angular/core';
import { SimpleGridComponent } from '@app/components/ag-grids/simple-grid/simple-grid.component';
import { RoleDto } from '@app/user-management/models/role.model';
import { RoleService } from '@app/user-management/services/role.service';
import { UserGroupService } from '@app/user-management/services/user-group.service';
import { UserRoleService } from '@app/user-management/services/user-role.service';
import { AppComponentBase } from '@shared/app-component-base';
import { ApiResponseOfT } from '@shared/models/api-response';
import { UserDto } from '@shared/models/user.model';
import { UserService } from '@shared/service-proxies/user.service';


@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent extends AppComponentBase implements OnInit {
  gridFullSearch = '';
  @ViewChild(SimpleGridComponent, { static: false }) simpleGrid: SimpleGridComponent;
  columnDefs = [
    // { headerName: 'Action', field: 'Action', cellRenderer: 'actionButtonsComponent', width: 100 },
    { headerName: 'Register Id', field: 'REGISTER_ID', filter: 'agTextColumnFilter' },
    { headerName: 'Ldap Name', field: 'LDAP_NAME', filter: 'agTextColumnFilter' },
    { headerName: 'First Name', field: 'FIRST_NAME', filter: 'agTextColumnFilter' },
    { headerName: 'Last Name', field: 'LAST_NAME', filter: 'agTextColumnFilter' },
    { headerName: 'Department', field: 'DEPARTMENT', filter: 'agTextColumnFilter' }
  ]
  users = [] as UserDto[];
  roles = [] as RoleDto[];
  userRoles = {};
  selectedUser: UserDto;
  constructor(injector: Injector,
    private userService: UserService,
    private userGroupService: UserGroupService,
    private roleService: RoleService,
    private userRoleService: UserRoleService
  ) {
    super(injector);
  }

  ngOnInit() {
    this.getUsers();
    this.getRoles();
  }

  protected async getUsers(): Promise<void> {
    // const userGroups = <ApiResponseOfT<UserGroupDto[]>>await this.userGroupService
    //   .getUserGroups(this.authService.currentUser.profile.register_id)
    //   .toPromise();

    // const grantedGroupIds = [];
    // const promises = userGroups.Result.map(group => group.ID).map(async groupId => {
    //   const grantedGroupId = <ApiResponseOfT<UserGroupDto[]>>await this.userGroupService
    //     .getUserGroupsInGroups(groupId)
    //     .toPromise();
    //   grantedGroupIds.push(grantedGroupId.Result.map(group => group.ID));
    // })

    // await Promise.all(promises);

    // if (grantedGroupIds.length === 0) {
    //   this.notify.warn('You don\'t have a group or your group doesn\'t have a granted group.')
    //   return;
    // }
    // const users = <ApiResponseOfT<UserDto[]>>await this.userService
    //   .getUsersInGroups(grantedGroupIds.join(','))
    //   .toPromise();
    const users = <ApiResponseOfT<UserDto[]>>await this.userService
      .getUsers()
      .toPromise();
    this.users = users.Result;
  }

  protected async getRoles(): Promise<void> {
    const roles = <ApiResponseOfT<RoleDto[]>>await this.roleService
      .getRolesInCurrentProject()
      .toPromise()
    this.roles = roles.Result;
    this.setFalseUserRolesToSwitch();
  }

  async onSelectionChanged(event: any) {
    const selectedUser = event.api.getSelectedRows() as UserDto[];
    this.selectedUser = selectedUser[0];
    const userRoles = <ApiResponseOfT<RoleDto[]>>await this.userService
      .getUserRolesInCurrentProject(selectedUser[0].REGISTER_ID)
      .toPromise()
    this.setFalseUserRolesToSwitch();
    for (const role of userRoles.Result) {
      if (this.userRoles[role.ID] !== undefined) {
        this.userRoles[role.ID] = true;
      }
    }
  }

  roleSelectionChange(roleId, event) {
    setTimeout(() => {
      if (event.target.className.includes('toggle-switch-checked')) {
        // add role
        this.userRoles[roleId] = true;
        this.userRoleService.addRoleToUser(this.selectedUser.REGISTER_ID, roleId)

        // add permission to user
        // this.roleService.getRolePermissions(roleId).subscribe((response) => {
        //   const rolePermissions = response.Result;
        //   this.userRoleService.addPermissionsToUser(this.selectedUser.REGISTER_ID, rolePermissions.map(p => p.ID));
        // })
      } else {
        // delete role
        this.userRoles[roleId] = false;
        this.userRoleService.deleteRoleToUser(this.selectedUser.REGISTER_ID, roleId)

        // delete permission from user
        // this.roleService.getRolePermissions(roleId).subscribe((response) => {
        //   const rolePermissions = response.Result;
        //   this.userRoleService.deletePermissionsFromUser(this.selectedUser.REGISTER_ID, rolePermissions.map(p => p.ID));
        // })
      }
    }, 100);
  }

  setFalseUserRolesToSwitch(): void {
    for (const role of this.roles) {
      this.userRoles[role.ID] = false;
    }
  }
}

