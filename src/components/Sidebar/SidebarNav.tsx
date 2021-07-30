import { Stack } from "@chakra-ui/react";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";
import { AiOutlineUnorderedList, AiOutlineUserAdd, AiOutlineCar } from 'react-icons/ai'

export function SidebarNav() {
  return(
    <Stack spacing="12" align="flex-start">
      <NavSection title="PASSAGEIROS">
        <NavLink href="/passageiros/listar" icon={AiOutlineUnorderedList}>Listar</NavLink>
        <NavLink href="/passageiros/adicionar" icon={AiOutlineUserAdd}>Adicionar</NavLink>
      </NavSection>

      <NavSection title="VEÍCULOS">
        <NavLink href="" icon={AiOutlineUnorderedList}>Listar</NavLink>
        <NavLink href="" icon={AiOutlineCar}>Adicionar</NavLink>
      </NavSection>
    </Stack>
  )
}