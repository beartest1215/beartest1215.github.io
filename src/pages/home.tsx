import { Button } from "@/components/ui/button";

function Home() {
  return (
    <div className="flex flex-1 p-6">
      <div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
        <div>
          <h1 className="font-medium">稳中向好啊稳中向好</h1>
          <p>You may now add components and start building.</p>
          <p>We&apos;ve already added the button component for you.</p>
          <Button className="mt-2">Button</Button>
        </div>
      </div>
    </div>
  );
}

export default Home;
