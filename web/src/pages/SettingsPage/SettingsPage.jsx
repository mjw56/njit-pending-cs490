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

  return (
    <>
      <Toaster />
      <MetaTags title="Profile" description="Profile page" />

      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex flexDirection={"column"} gap={"20px"}>
          <Box>
            <Text fontSize={"20px"} fontWeight={700} mb={5}>User Info</Text>
            <HStack borderRadius={"10px"} boxShadow={"2px 5px 50px 0px rgba(36, 37, 40, 0.10)"} p={"20px"}>
              <FormControl isRequired>
                <CustomFormLabel>First Name</CustomFormLabel>
                <Input border={"1px solid #DADADA"} {...register('firstName')} defaultValue={currentUser.firstName.toString()}></Input>
              </FormControl>
              <FormControl isRequired>
                <CustomFormLabel>Last Name</CustomFormLabel>
                <Input border={"1px solid #DADADA"} {...register('lastName')} defaultValue={currentUser.lastName.toString()}></Input>
              </FormControl>
            </HStack>
          </Box>
          <Spacer />
          <Box>
            <Text fontSize={"20px"} fontWeight={700} mb={5}>Pomodoro Timer</Text>
            <HStack borderRadius={"10px"} boxShadow={"2px 5px 50px 0px rgba(36, 37, 40, 0.10)"} p={"20px"}>
              <FormControl isRequired>
                <CustomFormLabel clock={true}>Pomodoro</CustomFormLabel>
                <Input type='number' border={"1px solid #DADADA"} {...register('pomodoro')} defaultValue={currentUser.pomodoro}></Input>
              </FormControl>
              <FormControl isRequired>
                <CustomFormLabel clock={true}>Short Break</CustomFormLabel>
                <Input type='number' border={"1px solid #DADADA"} {...register('shortBreak')} defaultValue={currentUser.shortBreak}></Input>
              </FormControl>
              <FormControl isRequired>
                <CustomFormLabel clock={true}>Long Break</CustomFormLabel>
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

const CustomFormLabel = (props) => {
  return (
    <>
      <FormLabel requiredIndicator color={"#545454"} fontSize={"14px"} fontWeight={"400"}><HStack>{props.clock ? <ClockIcon /> : <PersonIcon />}<Text>{props.children}</Text></HStack></FormLabel>
    </>
  )
}

export default SettingsPage
