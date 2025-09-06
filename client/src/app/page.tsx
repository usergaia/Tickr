"use client"
import { useEffect, useState } from "react";

export default function Home() {

  type Item = {
    _id?: string;
    name: string;
    age: number;
    employed: boolean;
  };

  const [backendData, setBackendData] = useState<Item[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('http://localhost:2000/api/items');
      const data = await res.json();
      setBackendData(data);
    };

    fetchData();
  }, []);


  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1 className="text-2xl font-bold mb-4">Items from Backend</h1>
      {backendData && backendData.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {backendData.map((item: Item, index: number) => (
            <div key={item._id || index} className="border rounded p-4 shadow">
              <div><strong>Name:</strong> {item.name}</div>
              <div><strong>Age:</strong> {item.age}</div>
              <div><strong>Employed:</strong> {item.employed ? 'Yes' : 'No'}</div>
            </div>
          ))}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
