import { FormControl, FormSelect, InputGroup } from "react-bootstrap"
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

export const SearchInput = ({ headquarter, setHeadquarter }: { headquarter: string, setHeadquarter: Function }) => {
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
        <InputGroup>
            <FormControl type="text" placeholder="¿Qué quieres buscar?" className="bg-white border-0" />
            <InputGroup.Text id="basic-addon1" className="bg-white border-0">
                <i className="bi bi-search text-dark"></i>
            </InputGroup.Text>
        </InputGroup>
    )
}