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
      console.log("response", response);
    } catch (e) {
      console.log("ERROR", e.message);
    }
  };

  console.log("errors", errors);

  return (
    <div className="border-white border-4 p-10 border rounded rounded-3xl">
      <h3 className="font-cubano text-3xl text-center mb-5 text-white">
        Upload CSV
      </h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <input
            {...register("csvFile")}
            type="file"
            accept=".csv"
            name="csvFile"
            id="csvFile"
            className="bg-white"
          />
        </div>
        <div className="text-end">
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded-lg font-cubano"
          >
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
