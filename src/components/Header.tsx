
import { Badge } from "@/components/ui/badge";

const Header = () => {
  return (
    <header className="bg-blue-900 text-white shadow-md">
      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center gap-4 mb-4 md:mb-0">
          <div className="flex-shrink-0">
            <img 
              src="/lovable-uploads/7ab974cc-e46f-4be1-a326-c10d9e82f6b2.png" 
              alt="San Andreas State Troopers Badge" 
              className="h-16 w-16"
            />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">San Andreas State Troopers</h1>
            <p className="text-blue-200">Shift Report Assistant</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Badge className="bg-yellow-500 text-blue-900 hover:bg-yellow-400">Est. 1953</Badge>
          <Badge variant="outline" className="border-yellow-500 text-yellow-400">OFFICIAL USE</Badge>
        </div>
      </div>
    </header>
  );
};

export default Header;
