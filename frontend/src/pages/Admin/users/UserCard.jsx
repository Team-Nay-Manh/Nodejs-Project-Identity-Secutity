import { useDrag } from "react-dnd"
import { memo } from "react"

const UserCard = memo(({ record, children, tableType, ...props }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "USER",
    item: {
      user: record,
      sourceTable: tableType
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  })

  console.log("Dragging user:", record, "from table:", tableType)

  if (!record?._id) return null

  return (
    <tr
      ref={drag}
      {...props}
      style={{
        ...props.style,
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
        backgroundColor: isDragging ? "rgba(0, 120, 212, 0.05)" : "transparent",
        transition: "all 0.2s ease"
      }}
    >
      {children}
    </tr>
  )
})

UserCard.displayName = "UserCard"

export default UserCard
