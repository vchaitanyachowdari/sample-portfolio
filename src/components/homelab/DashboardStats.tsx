import React, { useEffect, useState } from "react";
import { Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Card } from "@/once-ui/components/Card";
import { Flex } from "@/once-ui/components/Flex";
import { Spinner, Text } from "@/once-ui/components";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const DashboardStats: React.FC = () => {
  const [stats, setStats] = useState<any>(null);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/stats");
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data initially
    const interval = setInterval(() => {
      fetchData(); // Fetch data every 10 seconds
    }, 10000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  if (!stats) {
    return <Spinner size="m" />;
  }

  const cpuUsageData = {
    labels: ["Used", "Free"],
    datasets: [
      {
        data: [stats.cpu.usage_percent, 100 - stats.cpu.usage_percent],
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(200, 200, 200, 0.3)",
        ],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(200, 200, 200, 0.3)"],
        borderWidth: 1,
      },
    ],
  };

  const memoryUsageData = {
    labels: ["Used", "Free"],
    datasets: [
      {
        data: [
          stats.memory.used_mb,
          stats.memory.total_mb - stats.memory.used_mb,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(200, 200, 200, 0.3)",
        ],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(200, 200, 200, 0.3)"],
        borderWidth: 1,
      },
    ],
  };

  const diskLabels = Object.keys(stats.disk);
  const diskUsageData = diskLabels.map((disk) => ({
    label: disk,
    usage: stats.disk[disk].usage_percent,
    used: stats.disk[disk].used_gb,
    total: stats.disk[disk].total_gb,
  }));

  const networkUsage = {
    download: stats.network.bytes_recv_kb / 8000,
    upload: stats.network.bytes_sent_kb / 8000,
  };

  const networkUsageData = {
    labels: ["Down", "Up"],
    datasets: [
      {
        label: "Network Usage (MiB)",
        data: [networkUsage.download, networkUsage.upload],
        backgroundColor: ["rgba(54, 162, 235, 0.6)", "rgba(255, 99, 132, 0.6)"],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
        barThickness: 40,
      },
    ],
  };

  const gpu = stats.gpu[0];
  const gpuMemoryUsageData = {
    labels: ["Used", "Free"],
    datasets: [
      {
        data: [gpu.memory_used_mb, gpu.memory_free_mb],
        backgroundColor: [
          "rgba(153, 102, 255, 0.6)",
          "rgba(200, 200, 200, 0.3)",
        ],
        borderColor: ["rgba(153, 102, 255, 1)", "rgba(200, 200, 200, 0.3)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Flex
      direction="column"
      style={{ padding: "2rem", borderRadius: "10px", alignItems: "center" }}
    >
      <Text
        variant="heading-default-l"
        style={{
          textAlign: "center",
          marginBottom: "2rem",
          fontWeight: "bold",
        }}
      >
        Server Dashboard
      </Text>
      <Flex
        direction="row"
        wrap
        gap="m"
        style={{
          padding: "2rem",
          borderRadius: "10px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* CPU Usage */}
        <Card
          radius="l-4"
          direction="column"
          center
          padding="s"
          style={{ maxWidth: "250px" }}
        >
          <Text
            variant="body-default-xl"
            style={{ textAlign: "center", marginTop: "1rem" }}
          >
            CPU
          </Text>
          <Doughnut
            data={cpuUsageData}
            style={{ maxHeight: "200px", maxWidth: "200px" }}
            options={{
              responsive: true,
              cutout: "70%",
              circumference: 180,
              rotation: -90,
              plugins: { legend: { display: false } },
            }}
          />
          <Text variant="body-default-s" wrap="wrap">
            {stats.cpu.usage_percent.toFixed(2)}%
          </Text>
          <Text
            variant="body-default-s"
            wrap="wrap"
            style={{
              textAlign: "center",
            }}
          >
            {stats.cpu.name}
          </Text>
        </Card>

        {/* Memory Usage */}
        <Card radius="l-4" direction="column" padding="s">
          <Text
            variant="body-default-xl"
            style={{ textAlign: "center", marginTop: "1rem" }}
          >
            Memory
          </Text>
          <Doughnut
            data={memoryUsageData}
            style={{ maxHeight: "200px", maxWidth: "200px" }}
            options={{
              responsive: true,
              cutout: "70%",
              circumference: 180,
              rotation: -90,
              plugins: { legend: { display: false } },
            }}
          />
          {(stats.memory.used_mb / 1024).toFixed(2)} GiB /{" "}
          {(stats.memory.total_mb / 1024).toFixed(2)} GiB
        </Card>
        <Flex
          direction="row"
          wrap
          gap="m"
          style={{
            marginTop: "2rem",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {diskUsageData.map((disk) => (
            <Card key={disk.label} radius="l-4" direction="column" padding="s">
              <Text
                variant="body-default-xl"
                style={{ textAlign: "center", marginTop: "1rem" }}
              >
                Disk {disk.label}
              </Text>
              <Doughnut
                data={{
                  labels: ["Used", "Free"],
                  datasets: [
                    {
                      data: [disk.usage, 100 - disk.usage],
                      backgroundColor: [
                        "rgba(255, 159, 64, 0.6)",
                        "rgba(200, 200, 200, 0.3)",
                      ],
                      borderColor: [
                        "rgba(255, 159, 64, 1)",
                        "rgba(200, 200, 200, 0.3)",
                      ],
                      borderWidth: 1,
                    },
                  ],
                }}
                style={{ maxHeight: "200px", maxWidth: "200px" }}
                options={{
                  responsive: true,
                  cutout: "70%",
                  circumference: 180,
                  rotation: -90,
                  plugins: { legend: { display: false } },
                }}
              />
              {disk.used.toFixed(2)} GiB / {disk.total.toFixed(2)} GiB
            </Card>
          ))}
        </Flex>

        {/* Network Usage */}
        <Card radius="l-4" direction="column" padding="s">
          <Text
            variant="body-default-xl"
            style={{ textAlign: "center", marginTop: "1rem" }}
          >
            Network
          </Text>
          <Bar
            data={networkUsageData}
            style={{ maxHeight: "200px", maxWidth: "300px" }}
            options={{
              responsive: true,
              plugins: {
                legend: { display: false },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: "Usage (MB)",
                  },
                },
              },
            }}
          />
        </Card>

        <Card radius="l-4" direction="column" padding="s">
          <Text
            variant="body-default-xl"
            style={{ textAlign: "center", marginTop: "1rem" }}
          >
            GPU
          </Text>
          <Doughnut
            data={gpuMemoryUsageData}
            style={{ maxHeight: "200px", maxWidth: "200px" }}
            options={{
              responsive: true,
              cutout: "70%",
              circumference: 180,
              rotation: -90,
              plugins: { legend: { display: false } },
            }}
          />
          <Text variant="body-default-s">{gpu.name}</Text>
          <Text variant="body-default-s">
            {gpu.memory_used_mb} MiB / {gpu.memory_total_mb} MiB
          </Text>
          <Text variant="body-default-s">
            Load: {gpu.load_percent.toFixed(2)}% | Temp:{" "}
            {gpu.temperature_celsius}°C
          </Text>
        </Card>
      </Flex>
    </Flex>
  );
};

export default DashboardStats;
