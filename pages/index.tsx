import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Grocery from './groceryitems/grocery'
import GroceryList from './grocery-list/grocerylist'
import Recipe from './recipe/recipes'
import { Tab } from '@headlessui/react'

const Home: NextPage = () => {
  return (
    <div className="flex text-slate-300 min-h-screen flex-col items-center justify-center py-2 bg-slate-800">
      <Head>
        <title>Groceries</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full items-center justify-center px-20 text-center">
        <div className="grid grid-cols-1 justify-items-stretch">
          <Tab.Group>
            <Tab.List className="w-full">
              <Tab className="p-3 pb-5 mt-1 rounded-t-2xl bg-blue-600 mx-2 w-1/12 min-w-min hover:bg-blue-800 hover:pt-4 hover:mt-0">Store</Tab>
              <Tab className="p-3 pb-5 mt-1 rounded-t-2xl bg-blue-600 mx-2 w-1/12 min-w-min hover:bg-blue-800 hover:pt-4 hover:mt-0">Recipes</Tab>
              <Tab className="p-3 pb-5 mt-1 rounded-t-2xl bg-blue-600 mx-2 w-1/12 min-w-min hover:bg-blue-800 hover:pt-4 hover:mt-0">List</Tab>
            </Tab.List>
            <Tab.Panels className="w-full items-center justify-center text-center">
              <Tab.Panel>
                <Grocery />
              </Tab.Panel>
              <Tab.Panel>
                <Recipe />
              </Tab.Panel>
              <Tab.Panel>
                <GroceryList />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>

      </main>

      {/* <footer className="flex h-24 w-full items-center justify-center border-t">
        <a
          className="flex items-center justify-center gap-2"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </a>
      </footer> */}
    </div>
  )
}

export default Home
