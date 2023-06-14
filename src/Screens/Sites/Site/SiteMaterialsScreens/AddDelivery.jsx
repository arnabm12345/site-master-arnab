import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
} from "react-native";
import React from "react";
import CustomHeader from "../../../../Components/CustomHeader";
import CustomSafeAreaView from "../../../../utils/CustomSafeAreaView";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCard from "../../../../Components/MaterialCard";
import { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { TextInput } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import moment from "moment";
import CalendarPicker from "react-native-calendar-picker";
import * as Contacts from "expo-contacts";
import { useEffect } from "react";
import { FlatList } from "react-native";
import {
  AntDesign,
  FontAwesome5,
  Entypo,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
  Feather,
  FontAwesome,
  Ionicons,
} from "@expo/vector-icons";



const formValidationSchema = yup.object().shape({
  date: yup.string().required("date is required"),
  vendor: yup.string().required("Vendor is required"),
});
const AddDeliveries = ({ navigation }) => {
  const [checkboxState, setCheckboxState] = React.useState(false);
  const [upcomingActive, setupcomingActive] = useState(false);
  const [deliveredActive, setdeliveredActive] = useState(true);
  const [local_admin_body_id, setlocal_admin_body_id] = useState(1);
  const [CalendarOpen, setCalendarOpen] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [count, setCount] = useState(0);
  const [openCards, setOpenCards] = useState([]);

  const handleAddMaterial = () => {
    setCount(count + 1);
    setOpenCards(prevOpenCards => [...prevOpenCards, count]);
  };

  const handleCloseCard = (cardId) => {
    setOpenCards(prevOpenCards => prevOpenCards.filter(id => id !== cardId));
  };

  const MaterialAddCard = ({ title, quantity, count }) => {
    return (
      <View className="mt-4">
        <Text className="font-medium text-sm">Materials ({count})</Text>
        <View className="h-36 mt-1 w-full rounded-xl border-2 border-gray-200  flex flex-col justify-evenly">
          <View className="flex flex-row justify-evenly">
            <View className="h-10   flex-row justify-between items-center">
              <View className="bg-gray-200 rounded-xl h-10 justify-evenly" style={{width: '88%'}}>
              <Text className="ml-5 font-normal ">Select a Material</Text>
              </View>
              <AntDesign name="delete" size={20} color="black" style={{marginRight:6}}/>
            </View>
          </View>
          <View className="h-10  flex-row justify-evenly items-center" >
              <View  style={{width: '45%'}} className=" bg-gray-200 rounded-xl h-10 justify-evenly items-center flex flex-row">
              <TextInput className=""
              placeholder="Total Unit"
              />
              <Text className="font-medium">Bags</Text>
              </View>
              <Text className="font-medium"> X </Text>
              <View  style={{width: '45%'}} className=" bg-gray-200 rounded-xl h-10 justify-evenly items-center flex flex-row">
              <FontAwesome name="rupee" size={16} color="black" style={{marginTop:4}}/>    
              <TextInput className=""
              placeholder="Unit Price"
              />
              </View>
           </View>
  
           <View className="flex flex-row justify-evenly bg-gray-200 rounded-xl h-10 items-center ml-1" style={{width: '97%'}}>
             <Text>Total Price</Text>
             <View className="flex flex-row justify-between items-center">
             <FontAwesome name="rupee" size={16} color="black" style={{marginTop:4,marginRight:28}}/>
             <Text>00</Text>
             </View>
           </View>
        </View>
      </View>
    );
  };

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
        });

        if (data.length > 0) {
          setContacts(data);
          console.log(data[1]);
        }
      }
    })();
  }, []);

  const handleContactSelect = (contact) => {
    setSelectedContact(contact);
    setModalVisible(false);
  };

  return (
    <SafeAreaView>
     <ScrollView>
      <View className="py-4 px-4">
        <View className="flex flex-row justify-between items-center">
          <View className="flex flex-row items-center">
            <View className="flex flex-column">
              <Text className="text-xl font-semibold">Add Delivery</Text>
            </View>
          </View>
          <View className="flex flex-row justify-between ">
            <Entypo name="dots-three-vertical" size={20} color="black" />
          </View>
        </View>

        <View className="px-5 py-3">
          <View>
            <View className="flex items-center flex-row justify-between  items-center">
              <View className="">
                <BouncyCheckbox
                  isChecked={deliveredActive}
                  onPress={() => {
                    setdeliveredActive(!deliveredActive),
                      setupcomingActive(!upcomingActive),
                      setlocal_admin_body_id(1);
                  }}
                  size={22}
                  fillColor="purple"
                  text="Upcoming     "
                  unfillColor="gray"
                  textStyle={{
                    color: "black",
                    textDecorationLine: "none",
                    fontWeight: 500,
                    fontSize: 14,
                  }}
                  //iconStyle={{ borderColor: "purple" }}
                  bounceEffect={0.8}
                  disableBuiltInState
                  className={`ml-0 border  rounded-lg p-2 mt-1 ${
                    deliveredActive
                      ? "text-white bg-purple-200 border-purple-500"
                      : "text-gray-500 border-white bg-gray-200 opacity-70"
                  }`}
                  style={{}}
                />
              </View>
              <View className="">
                <BouncyCheckbox
                  isChecked={upcomingActive}
                  onPress={() => {
                    setdeliveredActive(!deliveredActive),
                      setupcomingActive(!upcomingActive),
                      setlocal_admin_body_id(2);
                  }}
                  size={22}
                  fillColor="purple"
                  text=" Delivered     "
                  unfillColor="gray"
                  textStyle={{
                    color: "black",
                    textDecorationLine: "none",
                    fontSize: 14,
                    fontWeight: 500,
                  }}
                  //iconStyle={{ borderColor: "purple" }}
                  bounceEffect={0.8}
                  className={`ml-2 border rounded-lg p-2 mt-1 ${
                    upcomingActive
                      ? "text-white bg-purple-200 border-purple-500 font-medium"
                      : "text-gray-500 border-white bg-gray-200 opacity-70"
                  }`}
                  disableBuiltInState
                />
              </View>
            </View>
          </View>
          <Formik
            validationSchema={formValidationSchema}
            initialValues={{
              date: moment().format("YYYY-MM-DD"),
              vendor: "",
            }}
            onSubmit={(values) => {
              //signUp(values.email, values.password);
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              isValid,
              touched,
              setFieldValue,
            }) => (
               
              <View className="flex flex-auto justify-evenly h-max">
                <View className="mt-4">
                  <Text className="text-sm font-medium"> Date</Text>

                  <TouchableOpacity
                    onPress={() => {
                      setCalendarOpen(true);
                    }}
                    className="h-10 mt-1 bg-gray-200 rounded-lg flex-row justify-between items-center"
                  >
                    <Text className="ml-7 font-normal">{values.date}</Text>
                    <Ionicons
                      name="md-calendar-outline"
                      size={20}
                      color="black"
                      style={{ marginRight: 8 }}
                    />
                  </TouchableOpacity>
                  {errors.date && (
                    <Text style={{ fontSize: 10, color: "red" }}>
                      {errors.date}
                    </Text>
                  )}
                </View>

                <View className="mt-4">
                  <Text className="text-sm font-medium"> Vendor</Text>

                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(true);
                    }}
                    className="h-10 mt-1 bg-gray-200 rounded-lg flex-row justify-between items-center"
                  >
                    <Text className="ml-7 font-normal text-sm">
                      {values.vendor
                        ? values.vendor
                        : "Select from your contact"}
                    </Text>
                    <MaterialIcons
                      name="contact-phone"
                      size={20}
                      color="black"
                      style={{ marginRight: 8 }}
                    />
                  </TouchableOpacity>
                  {touched.vendor && errors.vendor && (
                    <Text style={{ fontSize: 10, color: "red" }}>
                      {errors.date}
                    </Text>
                  )}
                </View>
                <Modal
                  visible={modalVisible}
                  animationType="slide"
                  transparent={true}
                  onRequestClose={() => setModalVisible(false)}
                >
                  <View className="flex-1 justify-center items-center bg-opacity-50 bg-black">
                    <Text className="text-white text-2xl font-bold mb-6">
                      Select a Contact
                    </Text>
                    <FlatList
                      style={{ flex: 1, width: "100%", height: "100%" }}
                      data={contacts}
                      keyExtractor={(item) => item.id}
                      renderItem={({ item }) => {
                        if (
                          !item ||
                          item.name === "null null" ||
                          !item.phoneNumbers
                        ) {
                          return null;
                        }

                        return (
                          <TouchableOpacity
                            key={item.id}
                            className="py-2 px-4 border-b border-white"
                            onPress={() => {
                              setFieldValue(
                                "vendor",
                                item.phoneNumbers[0].number
                              );
                              setModalVisible(false);
                            }}
                          >
                            <View
                              style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                              }}
                            >
                              <Text className="text-white text-sm">
                                {item.name}
                              </Text>
                              <Text className="text-white text-sm">
                                {item.phoneNumbers[0].number}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        );
                      }}
                    />

                    <TouchableOpacity
                      className="mt-6"
                      onPress={() => setModalVisible(false)}
                    >
                      <Text className="text-white text-lg font-bold">
                        Cancel
                      </Text>
                    </TouchableOpacity>
                  </View>
                </Modal>

           
                
                {openCards.map(cardId => (
            <MaterialAddCard key={cardId} count={count} onClose={() => handleCloseCard(cardId)} />
              ))}
              
                
                <TouchableOpacity className="flex flex-row justify-end items-center" onPress={handleAddMaterial}>
                <Text className="mt-2 font-medium">Add Material</Text>
                <View className="mt-2 ml-2 h-4 w-4 rounded bg-purple-200 items-center">
                <Entypo name="plus" size={16} color="black" />
                </View>
                </TouchableOpacity>
               
                <TouchableOpacity
                  className={
                    "mt-32  items-center py-5 px-8 rounded-lg w-full " +
                    (isValid ? "bg-purple-800" : "bg-gray-400")
                  }
                  onPress={handleSubmit}
                  disabled={!isValid}
                >
                  <View className="flex flex-row ">
                    <Text className="text-white font-bold mr-3">Save</Text>
                    <AntDesign name="check" size={20} color="white" />
                  </View>
                </TouchableOpacity>
                {CalendarOpen && (
                  <View
                    onPress={() => setCalendarOpen(false)}
                    className="absolute backdrop-blur-2xl h-4/5 w-full items-center justify-center"
                  >
                    <View></View>
                    <View className="bg-white p-2 border rounded">
                      <CalendarPicker
                        width={350}
                        height={400}
                        onDateChange={(date) => {
                          setCalendarOpen(false);
                          setFieldValue(
                            "date",
                            moment(date).format("YYYY-MM-DD")
                          );
                        }}
                      />
                    </View>
                  </View>
                )}
              </View>
           
            )}
          </Formik>
        </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddDeliveries;
