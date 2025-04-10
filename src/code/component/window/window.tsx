import Swal from 'sweetalert2';
import { useForm, SubmitHandler } from "react-hook-form";
import { Animate } from "../animate/animate";
import { Kehadiran } from "../footer/buttonSelection/buttonSelection"

type Props = {
    isOpen: boolean;
    setOpenWindow: React.Dispatch<React.SetStateAction<boolean>>;
    kehadiran: Kehadiran | null;
}

export const Window = ({ isOpen, setOpenWindow, kehadiran }: Props) => {
    type Inputs = {
        name: string;
        fon: string;
        jumlah: number;
        ucapan: string;
    };

    const { register, handleSubmit } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async data => {
        try {
            Swal.fire({
                icon: "success",
                title: "Kehadiran sudah di catat",
                showConfirmButton: false,
                timer: 1500
            });
            const updateData = {
                name: data.name,
                fon: data.fon,
                jumlah: data.jumlah,
                ucapan: data.ucapan,
                kehadiran: "tidak hadir"
            };

            if( kehadiran === Kehadiran.Hadir )
                updateData.kehadiran = "hadir"

            const response = await fetch('https://wed-service.onrender.com/kehadiran', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log('Success:', result);            
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Tolong masukkan semula",
                showConfirmButton: false,
                timer: 1500
            });
            console.error('Error:', error);
        }
    }

    const onClose = () => {
        setOpenWindow(!isOpen);
    }

    return (
        <>
            <Animate>
                <div className="h-[30rem] w-full absolute bottom-0 text-black bg-white rounded-lg">
                    <form onSubmit={handleSubmit(onSubmit)} className="w-full h-full flex ">
                        <div className="w-full h-full flex flex-col gap-6 border-2 border-[#353238] px-10 rounded-md">
                            <div className="flex flex-col gap-y-3 mt-5">
                                <div>
                                    <p className="mb-1">Nama</p>
                                    <div><input {...register("name")} className="w-full rounded-md border-[0.5px] border-black bg-gray-100 px-3 py-1" placeholder="Hana" /></div>
                                </div>
                                <div>
                                    <p className="mb-1">No. Telefon</p>
                                    <div><input {...register("fon")} className="w-full rounded-md border-[0.5px] border-black bg-gray-100 px-3 py-1" placeholder="0123456789" /></div>
                                </div>
                                <div>
                                    <p className="mb-1">Jumlah Kehadiran</p>
                                    <div><input type="number" {...register("jumlah")} className="w-full rounded-md border-[0.5px] bg-gray-100 border-black px-3 py-1" defaultValue={1} /></div>
                                </div>
                                <div>
                                    <p className="mb-1">Ucapan</p>
                                    <div><textarea {...register("ucapan")} className="w-full rounded-md border-[0.5px] bg-gray-100 border-black px-3 py-1 resize-y" placeholder="Semoga berbahagia" /></div>
                                </div>
                            </div>
                            <div className="flex justify-center items-center gap-x-4">
                                <button className='bg-white border-[0.5px] border-black px-5 py-2 rounded-lg' type="submit">Hantar</button>
                                <button className='bg-white border-[0.5px] border-black px-5 py-2 rounded-lg' type="button" onClick={onClose}>Batal</button>
                            </div>
                        </div>
                    </form>
                </div>
            </Animate>
        </>
    );
}
