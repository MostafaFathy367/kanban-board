import { Paper, Typography, Box, IconButton } from "@mui/material";
import { Draggable } from "@hello-pangea/dnd";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Chip } from "@mui/material";
import { Task } from "@/types/task";

const priorityConfig: Record<
  string,
  {
    label: string;
    color:
      | "error"
      | "warning"
      | "success"
      | "default"
      | "primary"
      | "secondary"
      | "info";
  }
> = {
  high: { label: "High", color: "error" },
  medium: { label: "Medium", color: "warning" },
  low: { label: "Low", color: "success" },
};
interface TaskCardProps {
  task: Task;
  index: number;
  onDelete: (id: string | number) => void;
  onEdit: (task: Task) => void;
}
export const TaskCard = ({ task, index, onDelete, onEdit }: TaskCardProps) => {
  const priority = priorityConfig[task.priority] || priorityConfig.low;

  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided) => (
        <Paper
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          sx={{ p: 2, mb: 2, backgroundColor: "#fff", borderRadius: 2 }}
        >
          <Typography variant="subtitle1" fontWeight="bold">
            {task.title}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {task.description}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
            <IconButton size="small" onClick={() => onEdit(task)}>
              <EditIcon fontSize="inherit" />
            </IconButton>
            <IconButton size="small" onClick={() => onDelete(task.id)}>
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          </Box>
          <Chip
            label={priority.label}
            color={priority.color}
            size="small"
            sx={{ fontSize: "10px", height: "18px", mb: 1 }}
          />
        </Paper>
      )}
    </Draggable>
  );
};
