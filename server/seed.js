const prisma = require('./prisma')

async function main() {
  const algebra = await prisma.course.create({
    data: {
      title: 'Algebra',
      description:
        'Learn equations, expressions, identities and algebraic concepts.',
      lessons: {
        create: [
          {
            title: 'Introduction to Algebra',
            content: 'Learn the basic concepts of algebra.',
            order: 1,
          },
          {
            title: 'Algebraic Expressions',
            content: 'Learn how to work with algebraic expressions.',
            order: 2,
          },
        ],
      },
    },
  })

  const geometry = await prisma.course.create({
    data: {
      title: 'Geometry',
      description:
        'Understand shapes, angles, theorems and geometric problems.',
      lessons: {
        create: [
          {
            title: 'Introduction to Geometry',
            content: 'Learn the basic concepts of geometry.',
            order: 1,
          },
          {
            title: 'Angles and Shapes',
            content: 'Learn about angles and different geometric shapes.',
            order: 2,
          },
        ],
      },
    },
  })

  const statistics = await prisma.course.create({
    data: {
      title: 'Statistics',
      description:
        'Learn data handling, graphs, averages and probability basics.',
      lessons: {
        create: [
          {
            title: 'Introduction to Statistics',
            content: 'Learn the basic concepts of statistics.',
            order: 1,
          },
          {
            title: 'Mean, Median and Mode',
            content: 'Learn how to calculate and understand averages.',
            order: 2,
          },
        ],
      },
    },
  })

  console.log('Courses created successfully!')
  console.log(algebra.title)
  console.log(geometry.title)
  console.log(statistics.title)
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })