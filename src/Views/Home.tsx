
import Table from "../Components/Table";
import Modals from "../Components/Modal";

    function Home() {

      return (
        <div className="p-3 w-full">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-center">Borç Takip Sayfası</h2>
              <Modals  />
            </div>
            <Table />
        </div>
      )
    }

    export default Home;