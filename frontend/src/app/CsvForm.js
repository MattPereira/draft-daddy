"use client";
import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

export function CsvForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("csvFile", data.csvFile[0]);
    formData.append("userId", data.userId);
    console.log(data);

    try {
      const response = await axios.post(
        "http://localhost:8000/analytics/csv-upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
    } catch (e) {
      console.log("ERROR", e.message);
    }
  };

  console.log("errors", errors);

  return (
    <div>
      <h3 className="font-mono text-4xl text-center mb-3">Upload CSV</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="text-black">
        <div>
          <input
            {...register("userId", { required: true })}
            type="number"
            placeholder="user id"
          />
        </div>
        <input
          {...register("csvFile")}
          type="file"
          accept=".csv"
          name="csvFile"
          id="csvFile"
        />
        <div className="text-end">
          <button type="submit" className="bg-indigo-500 px-4 py-2 text-white">
            Submit
          </button>
        </div>

        {Object.keys(errors).length !== 0 && (
          <span className="text-white">There was an error!</span>
        )}
      </form>
    </div>
  );
}
