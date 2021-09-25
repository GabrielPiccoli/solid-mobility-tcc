import { Stack } from "@chakra-ui/react";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";
import { AiOutlineUnorderedList, AiOutlineUserAdd, AiOutlineCar, AiOutlineUser } from 'react-icons/ai'
import { FaMapPin, FaMapSigns, FaRoute } from 'react-icons/fa'

export function SidebarNav() {
  return(
    <Stack spacing="4" align="flex-start">
      <NavSection title="PASSAGEIROS">
        <NavLink href="/passageiros" icon={AiOutlineUnorderedList}>Listar</NavLink>
        <NavLink href="/passageiros/adicionar" icon={AiOutlineUserAdd}>Adicionar</NavLink>
      </NavSection>

      <NavSection title="VEÍCULOS">
        <NavLink href="/vans" icon={AiOutlineUnorderedList}>Listar</NavLink>
        <NavLink href="/vans/adicionar" icon={AiOutlineCar}>Adicionar</NavLink>
      </NavSection>

      <NavSection title="ROTAS">
        <NavLink href="/rotas" icon={AiOutlineUnorderedList}>Listar</NavLink>
        <NavLink href="/rotas/adicionar" icon={FaRoute}>Adicionar</NavLink>
      </NavSection>

      <NavSection title="ENDEREÇOS">
        <NavLink href="/enderecos" icon={AiOutlineUnorderedList}>Listar</NavLink>
        <NavLink href="/enderecos/adicionar" icon={FaMapPin}>Adicionar</NavLink>
      </NavSection>

      <NavSection title="PARADAS">
        <NavLink href="/paradas" icon={AiOutlineUnorderedList}>Listar</NavLink>
        <NavLink href="/paradas/adicionar" icon={FaMapSigns}>Adicionar</NavLink>
      </NavSection>
    </Stack>
  )
}