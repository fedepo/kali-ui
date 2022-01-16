import React, { Component, useState, useContext, useEffect } from "react";
import { BrowserView, MobileView, isBrowser } from "react-device-detect";
import AppContext from "../../context/AppContext";
import Link from "next/link";
import { Flex, Spacer, HStack } from "@chakra-ui/react";
import Hamburger from "./Hamburger";
import Kali from "./Kali";
import Account from "./Account";
import Chain from "./Chain";

export default function Nav() {
  const value = useContext(AppContext);
  const { account, chainId } = value.state;
  return (
    <Flex id="nav-right-container">
      <Chain />
      <Account message="Connect" />
      <Hamburger />
    </Flex>
  );
}
