export type Item = {
  _id?: string;
  name: string;
  age: number;
  employed: boolean;
};

export async function fetchItems(): Promise<Item[]> {
  const res = await fetch("http://localhost:2000/api/items", {
    cache: "no-store",
  });
  return res.json();
}
