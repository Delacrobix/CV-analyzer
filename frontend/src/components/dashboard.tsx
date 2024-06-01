// import React from "react";

interface DashboardProps {
  data: string | null;
}

export default function Dashboard({ data }: Readonly<DashboardProps>) {
  return <div>{data}</div>;
}
