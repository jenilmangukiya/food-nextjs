import Link from "next/link";
import React, { Suspense } from "react";
import clasess from "./page.module.css";
import MealsGrid from "@/components/meals/MealsGrid";
import { getMeals } from "@/lib/meals";
import Loading from "./loading-out";

const Meals = async () => {
  const meals = await getMeals();
  return <MealsGrid meals={meals} />;
};

const MealsPage = async () => {
  return (
    <>
      <header className={clasess.header}>
        <h1>
          Delicious meals. created
          <span className={clasess.highlight}>by you</span>
        </h1>
        <p>
          Chooes your favorite recipe and cook it youtself. It is easy and fun
        </p>
        <p className={clasess.cta}>
          <Link href={"/meals/share"}>Share Your Favorite Recipe</Link>
        </p>
      </header>
      <main className={clasess.main}>
        <Suspense fallback={<Loading />}>
          <Meals />
        </Suspense>
      </main>
    </>
  );
};

export default MealsPage;
