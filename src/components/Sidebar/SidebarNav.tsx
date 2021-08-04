import { Stack } from "@chakra-ui/react";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";
import { AiOutlineUnorderedList, AiOutlineUserAdd, AiOutlineCar, AiOutlineUser } from 'react-icons/ai'
import { FaRoute } from 'react-icons/fa'

export function SidebarNav() {
  return(
    <Stack spacing="4" align="flex-start">
      <NavSection title="PASSAGEIROS">
        <NavLink href="/passageiros" icon={AiOutlineUnorderedList}>Listar</NavLink>
        <NavLink href="/passageiros/adicionar" icon={AiOutlineUserAdd}>Adicionar</NavLink>
      </NavSection>

      <NavSection title="MOTORISTAS">
        <NavLink href="/motoristas" icon={AiOutlineUnorderedList}>Listar</NavLink>
        <NavLink href="/motoristas/adicionar" icon={AiOutlineUser}>Adicionar</NavLink>
      </NavSection>

      <NavSection title="VEÍCULOS">
        <NavLink href="/vans" icon={AiOutlineUnorderedList}>Listar</NavLink>
        <NavLink href="/vans/adicionar" icon={AiOutlineCar}>Adicionar</NavLink>
      </NavSection>

      <NavSection title="ROTAS">
        <NavLink href="/rotas" icon={AiOutlineUnorderedList}>Listar</NavLink>
        <NavLink href="/rotas/adicionar" icon={FaRoute}>Adicionar</NavLink>
      </NavSection>
    </Stack>
  )
}