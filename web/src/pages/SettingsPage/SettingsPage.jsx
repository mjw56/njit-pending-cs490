import { routes } from '@redwoodjs/router'
import {MetaTags, useMutation} from '@redwoodjs/web'
import {Box, Button, Center, Flex, FormControl, FormLabel, HStack, Input, Spacer, Text} from "@chakra-ui/react";
import { useForm } from "@redwoodjs/forms";
import { useAuth } from "src/auth";
import { toast } from "@redwoodjs/web/toast";
import { Toaster } from '@redwoodjs/web/toast'

const UPDATE_SETTINGS = gql`
  mutation UpdateSettingsMutation($id: Int!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
    }
  }
`

const SettingsPage = () => {
  const { currentUser, reauthenticate } = useAuth()

  const {
    handleSubmit,
    register
  } = useForm()

  const [create, { loading, error }] = useMutation(
    UPDATE_SETTINGS,
    { onCompleted: reauthenticate }
  )

  const onSubmit = (data) => {
    data.pomodoro = parseInt(data.pomodoro)
    data.shortBreak = parseInt(data.shortBreak)
    data.longBreak = parseInt(data.longBreak)
    create({variables: {id: currentUser.id, input: data}}).then(r => toast.success('Settings Saved')).catch(r => toast.error('Error saving settings.'))
  }

  const themeChange = (newTheme) => {
    create({ variables: { id: currentUser.id, input: { theme: newTheme } } }).then((r) => toast.success("Theme Changed"))
  };

  const isLightTheme = currentUser.theme.toString() === 'Light Theme';

  return (
    <>
      <Toaster />
      <MetaTags title="Profile" description="Profile page" />

      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex flexDirection={"column"} gap={"20px"}>
          <Box>
            <HStack justify="space-between">
              <Text fontSize={"20px"} fontWeight={700} mb={5}>User Info</Text>
              <HStack>
                <Text mb={5}>{currentUser.theme.toString()}</Text>
                <HStack bg={isLightTheme?"white":"#252628"} rounded="full" mb="5" h="9" w="66px" borderColor="#DADADA" borderWidth="2px">
                  <HStack justify="space-between" p="5px">
                    <Box as="Button" type="button" w="22px" rounded="full" h="22px" display="flex" alignItems="center" justifyContent="center" bg={isLightTheme?"transparent":"#6284FF"} onClick={() => themeChange("Dark Theme")}><MoonIcon isLightTheme={isLightTheme}/></Box>
                    <Box as="Button" type="button" w="22px" rounded="full" h="22px" display="flex" alignItems="center" justifyContent="center" bg={isLightTheme?"#6284FF":"transparent"} onClick={() => themeChange("Light Theme")}><SunIcon isLightTheme={isLightTheme}/></Box>
                  </HStack>
                </HStack>
              </HStack>
            </HStack>
            <HStack borderRadius={"10px"} boxShadow={"2px 5px 50px 0px rgba(36, 37, 40, 0.10)"} p={"20px"}>
              <FormControl isRequired>
                <CustomFormLabel isLightTheme={isLightTheme}>First Name</CustomFormLabel>
                <Input border={"1px solid #DADADA"} {...register('firstName')} defaultValue={currentUser.firstName.toString()}></Input>
              </FormControl>
              <FormControl isRequired>
                <CustomFormLabel isLightTheme={isLightTheme}>Last Name</CustomFormLabel>
                <Input border={"1px solid #DADADA"} {...register('lastName')} defaultValue={currentUser.lastName.toString()}></Input>
              </FormControl>
            </HStack>
          </Box>
          <Spacer />
          <Box>
            <Text fontSize={"20px"} fontWeight={700} mb={5}>Pomodoro Timer</Text>
            <HStack borderRadius={"10px"} boxShadow={"2px 5px 50px 0px rgba(36, 37, 40, 0.10)"} p={"20px"}>
              <FormControl isRequired>
                <CustomFormLabel clock={true} isLightTheme={isLightTheme}>Pomodoro</CustomFormLabel>
                <Input type='number' border={"1px solid #DADADA"} {...register('pomodoro')} defaultValue={currentUser.pomodoro}></Input>
              </FormControl>
              <FormControl isRequired>
                <CustomFormLabel clock={true} isLightTheme={isLightTheme}>Short Break</CustomFormLabel>
                <Input type='number' border={"1px solid #DADADA"} {...register('shortBreak')} defaultValue={currentUser.shortBreak}></Input>
              </FormControl>
              <FormControl isRequired>
                <CustomFormLabel clock={true} isLightTheme={isLightTheme}>Long Break</CustomFormLabel>
                <Input type='number' border={"1px solid #DADADA"} {...register('longBreak')} defaultValue={currentUser.longBreak}></Input>
              </FormControl>
            </HStack>
          </Box>
          <Spacer />
          <Box>
           <Center gap={10}>
             <Button colorScheme={"blue"} size='lg' minWidth={"25%"} variant='outline' onClick={() => location.href = routes.home()} boxShadow={'0px 4px 80px 0px rgba(98, 132, 255, 0.20);'}>Cancel</Button>
             <Button colorScheme={"blue"} size='lg' minWidth={"25%"} type='submit' isLoading={loading} boxShadow={'0px 4px 80px 0px rgba(98, 132, 255, 0.20);'}>Save</Button>
           </Center>
         </Box>
        </Flex>
      </form>
    </>
  )
}

const PersonIcon = () => {
  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9.11992 8.1525C9.04492 8.145 8.95492 8.145 8.87242 8.1525C7.08742 8.0925 5.66992 6.63 5.66992 4.83C5.66992 2.9925 7.15492 1.5 8.99992 1.5C10.8374 1.5 12.3299 2.9925 12.3299 4.83C12.3224 6.63 10.9049 8.0925 9.11992 8.1525Z" stroke="#6284FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5.37004 10.92C3.55504 12.135 3.55504 14.115 5.37004 15.3225C7.43254 16.7025 10.815 16.7025 12.8775 15.3225C14.6925 14.1075 14.6925 12.1275 12.8775 10.92C10.8225 9.5475 7.44004 9.5475 5.37004 10.92Z" stroke="#6284FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </>
  )
}

const ClockIcon = () => {
  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M16.5 9C16.5 13.14 13.14 16.5 9 16.5C4.86 16.5 1.5 13.14 1.5 9C1.5 4.86 4.86 1.5 9 1.5C13.14 1.5 16.5 4.86 16.5 9Z" stroke="#6284FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M11.7827 11.385L9.45766 9.99751C9.05266 9.75751 8.72266 9.18001 8.72266 8.70751V5.63251" stroke="#6284FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </>
  )
}

const MoonIcon = ({isLightTheme}) => {
  return (
    <>
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.5228 7.85468C13.3812 7.81928 13.2396 7.85468 13.1157 7.94318C12.6555 8.33258 12.1245 8.65118 11.5404 8.86358C10.9917 9.07598 10.3899 9.18218 9.75272 9.18218C8.31901 9.18218 7.00921 8.59808 6.07111 7.65998C5.13301 6.72188 4.54891 5.41207 4.54891 3.97837C4.54891 3.37657 4.65511 2.79247 4.83211 2.26147C5.02681 1.69507 5.31001 1.18177 5.68171 0.739267C5.84101 0.544566 5.80561 0.261366 5.61091 0.102066C5.48701 0.0135654 5.34541 -0.0218346 5.20381 0.0135654C3.69931 0.420666 2.3895 1.32337 1.4514 2.52697C0.548701 3.71287 0 5.18197 0 6.79268C0 8.72198 0.778801 10.4743 2.0532 11.7487C3.32761 13.0231 5.07991 13.8019 7.00921 13.8019C8.63761 13.8019 10.1421 13.2355 11.3457 12.2974C12.567 11.3416 13.452 9.97868 13.8237 8.42108C13.9122 8.15558 13.7706 7.90778 13.5228 7.85468ZM10.8147 11.554C9.78812 12.3682 8.47831 12.8638 7.04461 12.8638C5.36311 12.8638 3.84091 12.1735 2.7435 11.0761C1.6461 9.97868 0.955802 8.45648 0.955802 6.77498C0.955802 5.37667 1.416 4.10227 2.2125 3.07567C2.7612 2.36767 3.45151 1.78357 4.24801 1.37647C4.15951 1.57117 4.07101 1.76587 4.00021 1.97827C3.77011 2.61547 3.66391 3.28807 3.66391 3.99607C3.66391 5.67757 4.35421 7.21748 5.45161 8.31488C6.54901 9.41228 8.08891 10.1026 9.77042 10.1026C10.5138 10.1026 11.2218 9.97868 11.8767 9.73088C12.1068 9.64238 12.3369 9.55388 12.5493 9.44768C12.1245 10.2619 11.5404 10.9876 10.8147 11.554Z" fill={isLightTheme?"#565353":"white"}/>
      </svg>
    </>
  )
}

const SunIcon = ({}) => {
  return (
    <>
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.75249 4.64762C9.10487 4 8.19058 3.58095 7.20011 3.58095C6.20963 3.58095 5.29534 3.98095 4.64772 4.64762C4.0001 5.29524 3.58105 6.20952 3.58105 7.2C3.58105 8.19048 4.0001 9.10476 4.64772 9.75238C5.29534 10.4 6.20963 10.8191 7.20011 10.8191C8.19058 10.8191 9.10487 10.4191 9.75249 9.75238C10.4001 9.10476 10.8192 8.19048 10.8192 7.2C10.8192 6.20952 10.4192 5.29524 9.75249 4.64762ZM9.06677 9.06667C8.59058 9.54286 7.92392 9.82857 7.20011 9.82857C6.4763 9.82857 5.80963 9.54286 5.33344 9.06667C4.85725 8.59048 4.57153 7.92381 4.57153 7.2C4.57153 6.47619 4.85725 5.80952 5.33344 5.33333C5.80963 4.85714 6.4763 4.57143 7.20011 4.57143C7.92392 4.57143 8.59058 4.85714 9.06677 5.33333C9.54297 5.80952 9.82868 6.47619 9.82868 7.2C9.82868 7.92381 9.54297 8.59048 9.06677 9.06667Z" fill="white"/>
        <path d="M13.9045 6.70476H12.4379C12.1712 6.70476 11.9426 6.93333 11.9426 7.2C11.9426 7.46666 12.1712 7.69524 12.4379 7.69524H13.9045C14.1712 7.69524 14.3998 7.46666 14.3998 7.2C14.3998 6.93333 14.1712 6.70476 13.9045 6.70476Z" fill="white"/>
        <path d="M7.20007 11.9429C6.93341 11.9429 6.70483 12.1714 6.70483 12.4381V13.9048C6.70483 14.1714 6.93341 14.4 7.20007 14.4C7.46674 14.4 7.69531 14.1714 7.69531 13.9048V12.4381C7.69531 12.1714 7.46674 11.9429 7.20007 11.9429Z" fill="white"/>
        <path d="M12.2856 11.6L11.238 10.5524C11.0666 10.3619 10.7428 10.3619 10.5523 10.5524C10.3618 10.7429 10.3618 11.0476 10.5523 11.2381L11.5999 12.2857C11.7904 12.4762 12.0951 12.4762 12.2856 12.2857C12.4761 12.0952 12.4761 11.7905 12.2856 11.6Z" fill="white"/>
        <path d="M7.20007 0C6.93341 0 6.70483 0.228572 6.70483 0.495239V1.96191C6.70483 2.22857 6.93341 2.45715 7.20007 2.45715C7.46674 2.45715 7.69531 2.22857 7.69531 1.96191V0.495239C7.69531 0.228572 7.46674 0 7.20007 0Z" fill="white"/>
        <path d="M12.3049 2.11428C12.1144 1.9238 11.8097 1.9238 11.6192 2.11428L10.5716 3.1619C10.3811 3.35237 10.3811 3.65714 10.5716 3.84761C10.743 4.03809 11.0668 4.03809 11.2573 3.84761L12.3049 2.79999C12.4954 2.60952 12.4954 2.30475 12.3049 2.11428Z" fill="white"/>
        <path d="M1.96191 6.70476H0.495239C0.228572 6.70476 0 6.93333 0 7.2C0 7.46666 0.209524 7.69524 0.495239 7.69524H1.96191C2.22857 7.69524 2.45715 7.46666 2.45715 7.2C2.45715 6.93333 2.22857 6.70476 1.96191 6.70476Z" fill="white"/>
        <path d="M3.82858 10.5524C3.65716 10.3619 3.33335 10.3619 3.14287 10.5524L2.09525 11.6C1.90477 11.7905 1.90477 12.0952 2.09525 12.2857C2.28573 12.4762 2.59049 12.4762 2.78096 12.2857L3.82858 11.2381C4.01906 11.0476 4.01906 10.7429 3.82858 10.5524Z" fill="white"/>
        <path d="M3.82858 3.1619L2.78096 2.11428C2.59049 1.9238 2.28573 1.9238 2.09525 2.11428C1.90477 2.30475 1.90477 2.60952 2.09525 2.79999L3.14287 3.84761C3.33335 4.03809 3.63811 4.03809 3.82858 3.84761C4.01906 3.65714 4.01906 3.35237 3.82858 3.1619Z" fill="white"/>
      </svg>
    </>
  )
}

const CustomFormLabel = ({ clock, isLightTheme, children }) => {
  return (
    <>
      <FormLabel requiredIndicator color={isLightTheme ? "#545454" : "white"} fontSize={"14px"} fontWeight={"400"}>
        <HStack>{clock ? <ClockIcon /> : <PersonIcon />}<Text>{children}</Text></HStack>
      </FormLabel>
    </>
  );
};

export default SettingsPage
