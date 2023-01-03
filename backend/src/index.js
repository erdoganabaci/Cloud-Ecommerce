const express = require("express");
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

// I used the Promise.all function to create a new product for each object in the array in parallel. This can be more efficient than creating the products sequentially, as it allows the database to process all the requests at the same time.
// The Promise.all function returns a single Promise that resolves when all of the promises in the iterable (in this case, an array of Promises returned by the prisma.product.create method) have resolved, or rejects with the reason of the first promise that rejects.
// For example, if all of the prisma.product.create calls resolve successfully, the resulting Promise returned by Promise.all will resolve with an array of the resulting products. If any of the calls reject (e.g. due to a database error), the Promise returned by Promise.all will reject with the error.

app.post(`/addProduct`, async (req, res) => {
  const products = req.body;
  const results = await Promise.all(
    products.map((product) =>
      prisma.product.create({
        data: {
          name: product.name,
          category: product.category,
          totalCount: product.totalCount,
        },
      })
    )
  );
  res.json(results);
});


app.get("/allProducts", async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      purchasedAt: {
        gt: new Date(Date.now() - 60 * 1000),
      },
    },
  });
  res.json(products);
});


// get totalSales with in 60 seconds
app.get("/totalSales", async (req, res) => {
  const totalSales = await prisma.product.aggregate({
    // by: ["totalCount"],
    where: {
      purchasedAt: {
        gt: new Date(Date.now() - 60 * 1000),
      },
    },
    _sum: {
      totalCount: true,
    },
  });
  res.json({ totalSales });
});

app.get("/product/:name", async (req, res) => {
  const product = await prisma.product.findMany({
    where: {
      purchasedAt: {
        gt: new Date(Date.now() - 60 * 1000),
      },
      name: req.params.name,
    },
  });
  res.json(product);
});

app.get("/productCategories", async (req, res) => {
  const product = await prisma.product.groupBy({
    by: ["category"],
    where: {
      AND: [
        {
          purchasedAt: {
            gt: new Date(Date.now() - 60 * 1000),
          },
        }
      ]
    },
    _sum: {
      totalCount: true,
    },
  });
  res.json(product);
});

app.get("/productCategory/:category", async (req, res) => {
  const product = await prisma.product.groupBy({
    by: ["category"],
    where: {
      AND: [
        {
          purchasedAt: {
            gt: new Date(Date.now() - 60 * 1000),
          },
        },
        {
          category: req.params.category,
        }
      ]
    },
    _sum: {
      totalCount: true,
    },
  });
  res.json(product);
});


const server = app.listen(3005, () =>
  console.log("🚀 Server ready at: http://localhost:3005")
);
