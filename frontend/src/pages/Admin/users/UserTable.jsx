import { useDrop } from "react-dnd"
import { Table } from "antd"
import UserCard from "./UserCard"

function UserTable({ users = [], title, onDrop, tableType, onReorder }) {
  const [{ isOver }, drop] = useDrop({
    accept: "USER",
    drop: (item, monitor) => {
      console.log("Dropped item:", item)
      console.log("Monitor.getItem():", monitor.getItem())
      const didDrop = monitor.didDrop()
      if (didDrop) return

      if (!item?.user?._id) return

      if (item.sourceTable === tableType) {
        // Reorder within the same table
        onReorder(item.user)
      } else {
        // Change role between tables
        onDrop(item.user)
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver()
    })
  })

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      render: (text) => <span>{text || "N/A"}</span>
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => <span>{text || "N/A"}</span>
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (text) => <span>{text || "N/A"}</span>
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (text) => <span>{text || "N/A"}</span>
    }
  ]

  // Ensure we have valid users data
  const validUsers = Array.isArray(users)
    ? users.filter((user) => user && typeof user === "object" && user._id)
    : []

  return (
    <div
      ref={drop}
      style={{
        backgroundColor: isOver ? "rgba(0, 120, 212, 0.1)" : "transparent",
        padding: "16px",
        borderRadius: "8px",
        transition: "all 0.3s ease"
      }}
    >
      <h2 className='text-xl font-bold mb-4'>{title}</h2>
      <Table
        columns={columns}
        dataSource={validUsers}
        rowKey='_id'
        pagination={{ pageSize: 5 }}
        components={{
          body: {
            row: (props) => (
              <UserCard
                {...props}
                record={props.children[0]?.props?.record}
                tableType={tableType}
              />
            )
          }
        }}
      />
    </div>
  )
}

export default UserTable
