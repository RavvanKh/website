"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import { useI18n } from "@/locales/client";

import Loader from "@/components/shared/loader/Loader";
import Customer from "./customer/Customer";

import { getCustomers } from "@/lib/utils/api/customers";

import styles from "./customers.module.css";
import Link from "next/link";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const t = useI18n();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true);
        const res = await getCustomers(0, 8);
        setCustomers(res?.content);
      } catch (error) {
        setError(error?.message || "Failed to load customers");
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  return (
    <section className={styles.customers}>
      <div className={styles.customersTop}>
        <div className={styles.customersTopTitle}>{t("ourCustomers")}</div>
        <Link href="/">
          <div>{t("viewAll")}</div>
          <Image
            src="/icons/arrow-top-right.svg"
            height={20}
            width={20}
            alt="Arrow"
          />
        </Link>
      </div>
      {loading ? (
        <div className={styles.customerLoaderContainer}>
          <Loader size="medium" color="primary" />
        </div>
      ) : error ? (
        <div className={styles.errorMessage}>
          Failed to load customers: {error}
        </div>
      ) : (
        <div className={styles.customersBottom}>
          {customers?.map((customer) => (
            <Customer key={customer?.id} customer={customer} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Customers;
