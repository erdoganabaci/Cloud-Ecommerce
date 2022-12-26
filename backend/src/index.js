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
          totalCount: product.totalCount,
        },
      })
    )
  );
  res.json(results);
});

// app.post(`/addProduct`, async (req, res) => {
//   const { name, totalCount } = req.body;
//   const result = await prisma.product.create({
//     data: {
//       name,
//       totalCount,
//     },
//   });
//   res.json(result);
// });

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

// SELECT SUM(quantity) AS total_sales
// FROM Product
// WHERE timestamp > NOW() - INTERVAL '60' SECOND;
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

// app.get("/totalSales", async (req, res) => {
//   const totalSales = await prisma.product.reduce({
//     select: {
//       quantity: true,
//     },
//     where: {
//       timestamp: {
//         gt: new Date(Date.now() - 10 * 1000),
//       },
//     },
//     reduce: (accumulator, product) => accumulator + product.quantity,
//   });
//   res.json({ totalSales });
// });

// app.get('/user/:id/drafts', async (req, res) => {
//   const { id } = req.params

//   const drafts = await prisma.user
//     .findUnique({
//       where: {
//         id: Number(id),
//       },
//     })
//     .posts({
//       where: { published: false },
//     })

//   res.json(drafts)
// })

// app.get(`/post/:id`, async (req, res) => {
//   const { id } = req.params

//   const post = await prisma.post.findUnique({
//     where: { id: Number(id) },
//   })
//   res.json(post)
// })

// app.get('/feed', async (req, res) => {
//   const { searchString, skip, take, orderBy } = req.query

//   const or = searchString
//     ? {
//         OR: [
//           { title: { contains: searchString } },
//           { content: { contains: searchString } },
//         ],
//       }
//     : {}

//   const posts = await prisma.post.findMany({
//     where: {
//       published: true,
//       ...or,
//     },
//     include: { author: true },
//     take: Number(take) || undefined,
//     skip: Number(skip) || undefined,
//     orderBy: {
//       updatedAt: orderBy || undefined,
//     },
//   })

//   res.json(posts)
// })

const server = app.listen(3001, () =>
  console.log("🚀 Server ready at: http://localhost:3001")
);
