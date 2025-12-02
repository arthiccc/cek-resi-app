
"use client";
import { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3001");

interface TrackingData {
  summary: {
    status: string;
    courier: string;
  };
  history: {
    date: string;
    desc: string;
  }[];
}

interface TrackingUpdate {
  error?: string;
  summary?: {
    status: string;
    courier: string;
  };
  history?: {
    date: string;
    desc: string;
  }[];
}

export default function ResiTracker() {
  const [resi, setResi] = useState("");
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const handleTrackingUpdate = (data: TrackingUpdate) => {
      if (data.error) {
        setError(data.error);
        setTrackingData(null);
      } else {
        setTrackingData(data as TrackingData);
        setError("");
      }
    };

    socket.on("tracking-update", handleTrackingUpdate);

    return () => {
      socket.off("tracking-update", handleTrackingUpdate);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setTrackingData(null);
    socket.emit("track-resi", { resi });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          type="text"
          value={resi}
          onChange={(e) => setResi(e.target.value)}
          placeholder="Masukkan nomor resi"
          className="border p-2 rounded w-full"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Lacak
        </button>
      </form>

      {error && <p className="text-red-500">{error}</p>}

      {trackingData && (
        <div className="border p-4 rounded">
          <h3 className="font-bold text-lg mb-2">Hasil Lacak Resi</h3>
          <p>
            <strong>Status:</strong> {trackingData.summary.status}
          </p>
          <p>
            <strong>Kurir:</strong> {trackingData.summary.courier}
          </p>
          <ul className="mt-2">
            {trackingData.history.map((item, index) => (
              <li key={index} className="border-b py-2">
                <p>{item.date}</p>
                <p>{item.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
