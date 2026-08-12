"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { SectionCard } from "@/components/admin/SectionCard";
import { AdminTextField } from "@/components/admin/AdminTextField";
import { AdminSaveBar } from "@/components/admin/AdminSaveBar";

export function PersonalInfoForm({ value, onSave }) {
  const [status, setStatus] = useState("idle");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({ defaultValues: value });

  const onSubmit = async (values) => {
    setStatus("saving");
    try {
      await onSave("profile", { ...values, yearsOfExperience: Number(values.yearsOfExperience) });
      setStatus("saved");
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <SectionCard title="Profile" description="This powers your hero and about sections.">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <AdminTextField
            id="name"
            label="Full name"
            error={errors.name?.message}
            {...register("name", { required: "Name is required." })}
          />
          <AdminTextField
            id="title"
            label="Title / role"
            error={errors.title?.message}
            {...register("title", { required: "Title is required." })}
          />
        </div>

        <AdminTextField
          id="tagline"
          label="Tagline"
          error={errors.tagline?.message}
          {...register("tagline", { required: "Tagline is required." })}
        />

        <AdminTextField
          id="bio"
          label="Bio"
          textarea
          error={errors.bio?.message}
          {...register("bio", { required: "Bio is required." })}
        />

        <div className="grid gap-5 sm:grid-cols-3">
          <AdminTextField id="location" label="Location" {...register("location")} />
          <AdminTextField id="availability" label="Availability status" {...register("availability")} />
          <AdminTextField
            id="yearsOfExperience"
            label="Years of experience"
            type="number"
            min="0"
            {...register("yearsOfExperience")}
          />
        </div>

        <AdminTextField id="avatarUrl" label="Avatar image URL" {...register("avatarUrl")} />

        <AdminSaveBar status={status} disabled={isSubmitting} />
      </form>
    </SectionCard>
  );
}
