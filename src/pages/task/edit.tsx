import { Edit } from "@refinedev/chakra-ui";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Textarea,
} from "@chakra-ui/react";
import { type HttpError } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import type { ITask } from "../../interfaces";
import React from "react";

export const TaskEdit = () => {
  const {
    refineCore: { formLoading },
    saveButtonProps,
    register,
    formState: { errors },
  } = useForm<ITask, HttpError, ITask>();

  return (
      <Edit isLoading={formLoading} saveButtonProps={saveButtonProps}>
        <FormControl mb="3" isInvalid={!!errors?.title}>
          <FormLabel>Título</FormLabel>
          <Input
              id="title"
              type="text"
              {...register("title", {
                required: "El título es requerido",
                maxLength: {
                  value: 10,
                  message: "El título no puede exceder los 10 caracteres",
                },
                validate: (value) => {
                  const noSpacesOrSpecialChars = /^[a-zA-Z0-9]*$/;
                  return (
                      noSpacesOrSpecialChars.test(value) ||
                      "El título no debe tener espacios ni caracteres especiales"
                  );
                },
              })}
          />
          <FormErrorMessage>{`${errors.title?.message}`}</FormErrorMessage>
        </FormControl>

        <FormControl mb="3" isInvalid={!!errors?.completed}>
          <FormLabel>Status</FormLabel>
          <Select
              id="Estatus"
              placeholder="Seleccione el estatus"
              {...register("completed", {
                required: "El estatus es requerido",
              })}
          >
            <option value="false">En proceso</option>
            <option value="true">Culminada</option>
          </Select>
          <FormErrorMessage>{`${errors.completed?.message}`}</FormErrorMessage>
        </FormControl>

        <FormControl mb="3" isInvalid={!!errors?.description}>
          <FormLabel>Descripción</FormLabel>
          <Textarea
              id="content"
              {...register("description", {
                required: "La descripción es requerida",
                maxLength: {
                  value: 150,
                  message: "La descripción no puede exceder los 150 caracteres",
                },
              })}
          />
          <FormErrorMessage>{`${errors.description?.message}`}</FormErrorMessage>
        </FormControl>
      </Edit>
  );
};