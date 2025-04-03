import UserTable from "./UserTable"
import { useUser } from "./useUser"

function UserPage() {
  const {
    regularUsers = [],
    adminUsers = [],
    isLoading,
    toggleRole
  } = useUser()

  const handleDrop = (user) => {
    if (!user?._id) return
    toggleRole(user._id)
  }

  const handleReorder = (user, tableType) => {
    if (!user?._id) return
    // Here you can implement any additional logic for reordering
    console.log(`Reordering user ${user._id} in ${tableType} table`)
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className='p-4'>
      <div className='flex gap-4'>
        <div className='flex-1'>
          <UserTable
            users={regularUsers}
            title='Regular Users'
            onDrop={handleDrop}
            tableType='regular'
            onReorder={(user) => handleReorder(user, "regular")}
          />
        </div>
        <div className='flex-1'>
          <UserTable
            users={adminUsers}
            title='Admin Users'
            onDrop={handleDrop}
            tableType='admin'
            onReorder={(user) => handleReorder(user, "admin")}
          />
        </div>
      </div>
    </div>
  )
}

export default UserPage
