import { Stack } from "@chakra-ui/react";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";
import { AiOutlineUnorderedList, AiOutlineUserAdd, AiOutlineCar, AiOutlineUser } from 'react-icons/ai'
import { FaRoute } from 'react-icons/fa'

export function SidebarNav() {
  return(
    <Stack spacing="4" align="flex-start">
      <NavSection title="PASSAGEIROS">
        <NavLink href="/passageiros/listar" icon={AiOutlineUnorderedList}>Listar</NavLink>
        <NavLink href="/passageiros/adicionar" icon={AiOutlineUserAdd}>Adicionar</NavLink>
      </NavSection>

      <NavSection title="MOTORISTAS">
        <NavLink href="" icon={AiOutlineUnorderedList}>Listar</NavLink>
        <NavLink href="" icon={AiOutlineUser}>Adicionar</NavLink>
      </NavSection>

      <NavSection title="VEÍCULOS">
        <NavLink href="" icon={AiOutlineUnorderedList}>Listar</NavLink>
        <NavLink href="" icon={AiOutlineCar}>Adicionar</NavLink>
      </NavSection>

      <NavSection title="ROTAS">
        <NavLink href="" icon={AiOutlineUnorderedList}>Listar</NavLink>
        <NavLink href="" icon={FaRoute}>Adicionar</NavLink>
      </NavSection>
    </Stack>
  )
}