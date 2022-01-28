import { useContext, useEffect } from "react";
import AppContext from "../../context/AppContext";
import { BrowserView, MobileView } from "react-device-detect";
import { Button, Center, HStack, VStack, Container } from "@chakra-ui/react";
import { BiGridAlt, BiEdit} from "react-icons/bi";
import { RiStackLine } from "react-icons/ri";
import { VscNewFile } from "react-icons/vsc";

const ActionButton = (props) => {
  return (
    <Button
      leftIcon={props.icon}
      onClick={props.onClick}
      backgroundColor={props.backgroundColor}
      border="none"
      size={{sm: 'sm', md: 'md', lg: 'md', xl: 'md', '2xl': 'md'}}
    >
      {props.children}
    </Button>
  );
};

const actions = [
  {
    name: "Dashboard",
    icon: <BiGridAlt />,
  },
  {
    name: "Proposals",
    icon: <RiStackLine />,
  },
  {
    name: "New Proposal",
    icon: <BiEdit />,
  },
];

export default function ActionMenu(props) {
  const value = useContext(AppContext);
  const { visibleView, remount } = value.state;

  const handleClick = (id) => {
    value.setVisibleView(id);
    value.setRemount(remount+1);
    console.log(remount, "remount")
  };

  return (
      <>
       {actions.map((item, index) => (
         <ActionButton
           onClick={() => handleClick(index+1)}
           backgroundColor={visibleView == index + 1 ? "#eeeeee" : "none"}
           icon={item.icon}
           key={index}
         >
           {item.name}
         </ActionButton>
       ))}
      </>
  );
}
