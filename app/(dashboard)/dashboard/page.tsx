import { cookies } from 'next/headers'
import Link from 'next/link'
import { Suspense } from 'react'
import { db } from '@/lib/db'
import { delay } from '@/lib/async'
import Greeting from '@/components/Greeting'
import TaskCard from '@/components/TaskCard'
import { getUserFromCookie } from '@/lib/auth'
import GreetingSkeleton from '@/components/GreetingSkeleton'
import ProjectCard, { ProjectWithTasks } from '@/components/ProjectCard'
import NewProject from '@/components/NewProject'

const getData = async () => {
  await delay(2000)
  const user = await getUserFromCookie(cookies())

  const projects = await db.project.findMany({
    where: { ownerId: user?.id },
    include: { tasks: true },
  })

  return { projects }
}

export default async function Dashboard() {
  const { projects } = await getData()

  return (
    <div className="h-full overflow-y-auto pl-6 w-full">
      <div className=" h-full  items-stretch justify-center min-h-[content]">
        <div className="flex-1 grow flex">
          <Suspense fallback={<GreetingSkeleton />}>
            {/* @ts-expect-error Server Component */}
            <Greeting />
          </Suspense>
        </div>
        <div className="flex flex-2 grow items-center flex-wrap mt-3 -m-3 ">
          {projects.map((project) => (
            <div className="w-1/3 p-3" key={project.id}>
              <Link href={`/project/${project.id}`}>
                <ProjectCard project={project as ProjectWithTasks} />
              </Link>
            </div>
          ))}
          <div className="w-1/3 p-3">
            <NewProject />
          </div>
        </div>
        <div className="mt-6 flex-2 grow w-full flex">
          <div className="w-full">
            {/* @ts-expect-error Server Component */}
            <TaskCard title="Upcoming Tasks" />
          </div>
        </div>
      </div>
    </div>
  )
}
