"use client";

import React from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Stack,
  Avatar,
} from "@mui/material";
import Grid from '@mui/material/Grid';

import { useTasks } from "@/hooks/useTasks";
import { useBoardStore } from "@/store/useBoardStore";
import { Column } from "@/components/Column";
import { SearchBar } from "@/components/SearchBar";
import { TaskModal } from "@/components/TaskModal";
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Task } from "@/types/task";

export default function KanbanBoard() {
  const { tasks, isLoading, updateTaskMutation } = useTasks();
  const { searchTerm, openModal } = useBoardStore();
  const { deleteTaskMutation } = useTasks();
  const totalTasks = tasks?.length || 0;

  const handleDelete = (id: string | number) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      deleteTaskMutation.mutate(id);
    }
  };

  const handleEdit = (task: Task) => {
    openModal(task);
  };
  const filteredTasks =
    tasks?.filter(
      (task: Task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase()),
    ) || [];

  
  const columnsData = [
    { id: "backlog", title: "Backlog" },
    { id: "in_progress", title: "In Progress" },
    { id: "review", title: "Review" },
    { id: "done", title: "Done" },
  ];


  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }

    
    const movedTask = tasks.find((t: Task) => t.id.toString() === draggableId);

    if (movedTask) {
      
      updateTaskMutation.mutate({
        ...movedTask,
        column: destination.droppableId,
      });
    }
  };

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
        sx={{ borderBottom: "1px solid #e0e0e0", pb: 2 }}
      >
        
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Avatar sx={{ bgcolor: "primary.main", width: 32, height: 32 }}>
            <DashboardIcon sx={{ fontSize: 20 }} />
          </Avatar>
          <Stack direction="row" alignItems="baseline" spacing={1}>
            <Typography variant="h5" fontWeight="bold" letterSpacing={0.5}>
              KANBAN BOARD
            </Typography>
            <Typography
              variant="caption"
              color="textSecondary"
              sx={{ fontWeight: 600 }}
            >
              {totalTasks} items
            </Typography>
          </Stack>
        </Stack>

        
        <SearchBar />
      </Box>

      
      <DragDropContext onDragEnd={onDragEnd}>
        <Grid
          container
          spacing={3}
          sx={{ overflowX: "auto", flexWrap: "nowrap", pb: 2 }}
        >
          {columnsData.map((col) => (
            <Grid container key={col.id} spacing={3} sx={{ overflowX: 'auto', flexWrap: 'nowrap', pb: 2 }}>
              <Column
                title={col.title}
                status={col.id}
                tasks={filteredTasks.filter((t: Task) => t.column === col.id)}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            </Grid>
          ))}
        </Grid>
      </DragDropContext>

      {/* Task Modal for Create/Update */}
      <TaskModal />
    </Container>
  );
}
