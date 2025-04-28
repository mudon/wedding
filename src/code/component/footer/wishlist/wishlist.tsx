import Swal from "sweetalert2";
import { useForm, SubmitHandler } from "react-hook-form";
import { Animate } from "../../animate/animate";
import { createClient } from "@supabase/supabase-js";

type Inputs = {
  name: string;
  fon: string;
  jumlah: string;
  ucapan: string;
};

export const Wishlist = () => {
  const { register, handleSubmit } = useForm<Inputs>();

  const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_KEY
  );

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      Swal.fire({
        icon: "success",
        title: "Ucapan diterima",
        showConfirmButton: false,
        timer: 1500,
      });
      const updateData = {
        name: data.name,
        fon: "",
        jumlah: "0",
        ucapan: data.ucapan,
      };


      await supabase.from("Senarai").insert({
        id: Date.now().toString(),
        name: updateData.name,
        nomborFon: updateData.fon,
        jumlahKehadiran: parseInt(updateData.jumlah),
        ucapan: updateData.ucapan
          });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Tolong masukkan semula",
        showConfirmButton: false,
        timer: 1500,
      });
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Animate>
        <div className="w-full absolute bottom-0 text-black bg-white rounded-lg">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full h-full flex "
          >
            <div className="w-full h-full flex flex-col gap-6 border-2 border-[#353238] px-10 py-5 rounded-md">
              <div className="flex flex-col gap-y-3 mt-5">
                <div>
                  <p className="mb-1">Nama</p>
                  <div>
                    <input
                      {...register("name")}
                      className="w-full rounded-md border-[0.5px] border-black bg-gray-100 px-3 py-1"
                      placeholder="Hana"
                    />
                  </div>
                </div>
                <div>
                  <p className="mb-1">Ucapan</p>
                  <div>
                    <textarea
                      {...register("ucapan")}
                      className="w-full rounded-md border-[0.5px] bg-gray-100 border-black px-3 py-1 resize-y"
                      placeholder="Semoga berbahagia"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center gap-x-4">
                <button
                  className="bg-white border-[0.5px] border-black px-5 py-2 rounded-lg"
                  type="submit"
                >
                  Hantar
                </button>
              </div>
            </div>
          </form>
        </div>
      </Animate>
    </>
  );
};
