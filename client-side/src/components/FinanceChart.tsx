"use client";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Button, Modal } from "@/components/ui";
import { chartOptions } from "@/constants";
import { FinanceDataForm } from "./modals";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function FinanceChart({ data }: any) {
  return (
    <div className="flex max-w-full">
      <Doughnut data={data} options={chartOptions} />
      <Modal
        ModalOpenButton={Button}
        className="bg-slate-300 text-neutral-800 w-8 h-8 hover:bg-slate-400"
        btnContent="x"
      >
        <FinanceDataForm>asdads</FinanceDataForm>
      </Modal>
    </div>
  );
}
