const UserPerms = {
    Test: (user, test) => { return ((user & test) == test); },
    Admin: 0x1,
    Execute: 0x2,
    UserManage: 0x4,
}

export default UserPerms;