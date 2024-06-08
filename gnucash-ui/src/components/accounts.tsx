import Filter from "./filter";

export default async function AccountsListing() {
  // const res = await fetch(
  //   "http://127.0.0.1:8001/saro-accounts-sqlite/account_full_names.json?_shape=array"
  // );

  // if (!res.ok) {
  //   // This will activate the closest `error.js` Error Boundary
  //   throw new Error("Failed to fetch data");
  // }

  return <Filter data={[]} />;
}

