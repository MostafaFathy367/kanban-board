import { Box, Typography, Paper, Button, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useBoardStore } from "@/store/useBoardStore";
import { Droppable } from "@hello-pangea/dnd";
import { TaskCard } from "./TaskCard";
import { Task, TaskStatus } from "@/types/task";
interface ColumnProps {
  title: string;
  status: TaskStatus;
  tasks: Task[];
  onDelete: (id: string | number) => void;
  onEdit: (task: Task) => void;
}
export const Column = ({
  title,
  status,
  tasks,
  onDelete,
  onEdit,
}: ColumnProps) => {
  const openModal = useBoardStore((state) => state.openModal);
  const columnColors: Record<string, string> = {
    backlog: "#94a3b8",
    in_progress: "#3b82f6",
    review: "#eab308",
    done: "#22c55e",
  };
  return (
    <Box
      sx={{
        flex: 1,
        minWidth: "280px",
        mx: 1,
        backgroundColor: "#f4f5f7",
        p: 2,
        borderRadius: 2,
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
        <Box
          sx={{
            width: 12,
            height: 12,
            borderRadius: "50%",
            bgcolor: columnColors[status],
          }}
        />
        <Typography variant="subtitle1" fontWeight="bold">
          {title}
        </Typography>
        <Typography
          variant="caption"
          sx={{ ml: "auto", bgcolor: "#e2e8f0", px: 1, borderRadius: 1 }}
        >
          {tasks.length}
        </Typography>
      </Stack>

      <Droppable droppableId={status}>
        {(provided) => (
          <Paper
            ref={provided.innerRef}
            {...provided.droppableProps}
            sx={{
              p: 2,
              backgroundColor: "#f4f5f7",
              minHeight: "500px",
            }}
          >
            {tasks.map((task: Task, index: number) => (
              <TaskCard
                key={task.id}
                task={task}
                index={index}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            ))}
            {provided.placeholder}

            <Button
              fullWidth
              startIcon={<AddIcon />}
              onClick={() => openModal(null, status)}
              sx={{ mt: 1, color: "#5e6c84", justifyContent: "flex-start" }}
            >
              Add a card
            </Button>
          </Paper>
        )}
      </Droppable>
    </Box>
  );
};
