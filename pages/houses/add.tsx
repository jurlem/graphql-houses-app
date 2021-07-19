import { GetServerSideProps, NextApiRequest } from "next";
import { loadIdToken } from "src/auth/firebaseAdmin";
import Layout from "src/components/layout";
import HouseForm from "src/components/houseForm";


export default function Add() {
  return <Layout main={<HouseForm />} />;
}
//if user is NOT logged in, we check it before browser rendering and send them to login (SSR)
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const uid = await loadIdToken(req as NextApiRequest)

  if (!uid) {
    res.setHeader("location", "/auth")
    res.statusCode = 302
    res.end()
  }

  return { props: {} }
}