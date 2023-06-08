import { FC, ReactNode } from "react";
import Head from "next/head";

import { Box } from "@mui/material";
import { Navbar, Sidebar } from "../ui";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Props {
  title?: string;
  children?: ReactNode;
}

export const Layout: FC<Props> = ({ title = "MeuJira", children }) => {
  return (
    <Box sx={{ flexFlow: 1 }}>
      
      <Head>
        <title>{title}</title>
      </Head>

      <Navbar />

      <Sidebar />

      <ToastContainer />

      <Box sx={{ padding: "10px 20px" }}>{children}</Box>
    </Box>
  );
};
