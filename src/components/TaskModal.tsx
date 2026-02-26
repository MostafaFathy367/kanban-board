"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Stack,
} from "@mui/material";
import { useForm} from "react-hook-form";
import { useBoardStore } from "@/store/useBoardStore";
import { useTasks } from "@/hooks/useTasks";
import { useEffect } from "react";
import { CreateTaskInput } from '@/types/task';

export const TaskModal = () => {
  const { isModalOpen, closeModal, editingTask } = useBoardStore();
  const { createTaskMutation, updateTaskMutation } = useTasks();
  const { register, handleSubmit, reset, setValue } = useForm<CreateTaskInput>();
  const defaultColumn = useBoardStore((state) => state.defaultColumn);

  useEffect(() => {
    if (editingTask) {
      setValue("title", editingTask.title);
      setValue("description", editingTask.description);
    } else {
      reset({ title: "", description: "" });
    }
  }, [editingTask, setValue, reset]);

  const onSubmit = (data: CreateTaskInput) => {
    if (editingTask) {
      updateTaskMutation.mutate({ ...editingTask, ...data });
    } else {
      createTaskMutation.mutate({ ...data, column: defaultColumn });
    }
    closeModal();
    reset();
  };

  return (
    <Dialog open={isModalOpen} onClose={closeModal} fullWidth maxWidth="sm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>{editingTask ? "Edit Task" : "Add New Task"}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              autoFocus
              label="Title"
              fullWidth
              {...register("title", { required: true })}
            />
            <TextField
              label="Description"
              multiline
              rows={3}
              fullWidth
              {...register("description")}
            />
            <TextField
              select
              label="Priority"
              fullWidth
              SelectProps={{ native: true }}
              {...register("priority")}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </TextField>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal}>Cancel</Button>
          <Button type="submit" variant="contained">
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
