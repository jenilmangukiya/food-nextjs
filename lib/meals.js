import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import fs from "node:fs";

const db = sql("meals.db");

export const getMeals = async () => {
  //   await new Promise((resolve) => setTimeout(resolve, 2000));
  //   throw new Error("Manual error");

  return db.prepare("SELECT * FROM meals").all();
};

export const getMeal = async (slug) => {
  return db.prepare(`SELECT * FROM meals where slug = ?`).get(slug);
};

export const saveMeal = async (meal) => {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  const extention = meal.image.name.split(".").pop();
  const fileName = `${meal.slug}.${extention}`;

  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const buffer = await meal.image.arrayBuffer();

  stream.write(Buffer.from(buffer), (error) => {
    if (error) {
      throw new Error("Saving image failed");
    }
  });

  meal.image = `/images/${fileName}`;

  db.prepare(
    `Insert into meals (title,summary,instructions,creator, creator_email,image,slug) 
      VALUES (     
        @title,
        @summary,
        @instructions,
        @creator,
        @creator_email,
        @image,
        @slug
      )`
  ).run(meal);
};
