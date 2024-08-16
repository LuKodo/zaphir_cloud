import { FormSelect } from "react-bootstrap"
import { Sede } from "@/interfaces/interfaces"
import { useQuery } from "@tanstack/react-query"

const fetchSedes = async () => {
    const response = await fetch(`/api/sede`)

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    const data = await response.json()
    return data.data
}

export const Sedes = ({ headquarter, setHeadquarter }: { headquarter: string, setHeadquarter: Function }) => {
    const { status, data, error } = useQuery({
        queryKey: ['sedes'],
        queryFn: fetchSedes
    });

    if (status === 'pending') {
        return <span>Loading...</span>
    }

    if (status === 'error') {
        return <span>Error: {error.message}</span>
    }

    return (
        <FormSelect
            name="sede"
            className="border-0 p-0 text-white bg-transparent"
            value={headquarter}
            onChange={(e) => {
                const target = e.target as HTMLSelectElement
                setHeadquarter(target.value ?? 'SB')
            }}
        >
            {data.map((sede: Sede) => {
                return (
                    <option key={sede.prefijo} className={"bg-warning text-white"} value={sede.prefijo}>{sede.nombre}</option>
                )
            })}
        </FormSelect>
    )
}