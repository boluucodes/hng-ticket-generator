import { useState, useEffect } from "react";
import Select from "react-select";
import locationPin from "../assets/locationPin.svg";
import { useNavigate } from "react-router-dom";

const tickets = [
  { type: "Regular Access", price: "Free", amount: 20 },
  { type: "VIP Access", price: "$ 50", amount: 20 },
  { type: "VVIP Access", price: "$ 150", amount: 20 },
];

const TicketSelection = () => {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [ticketError, setTicketError] = useState("");
  const [quantityError, setQuantityError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const savedTicket = JSON.parse(localStorage.getItem("ticketSelection"));
    if (savedTicket) {
      setSelectedTicket(savedTicket.ticket);
      setQuantity(savedTicket.quantity);
    }
  }, []);

  useEffect(() => {
    if (selectedTicket) {
      localStorage.setItem(
        "ticketSelection",
        JSON.stringify({ ticket: selectedTicket, quantity })
      );
    }
  }, [selectedTicket, quantity]);

  const quantityOptions = Array.from({ length: 20 }, (_, i) => ({
    value: i + 1,
    label: `${i + 1}`,
  }));

  // Custom styles for react-select
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "#08252B",
      borderColor: "#07373F",
      color: "white",
      "&:hover": {
        borderColor: "#07373F",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#07373F" : "#08252B",
      color: "white",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#08252B",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "white",
    }),
    input: (provided) => ({
      ...provided,
      color: "white",
    }),
  };

  return (
    <div className="max-w-xl mx-auto p-4 sm:p-6 bg-[#041E23] text-white rounded-2xl border-[1px] border-[#07373F]">
      <div className="flex justify-between flex-col sm:flex-row">
        <p className="text-xl font-light mb-2 JejuMyeongjo">Ticket Selection</p>
        <p className="mb-2 sm:mb-0">Step 1/3</p>
      </div>
      <div className="loading-bar mb-6">
        <div className="filled-bar" style={{ width: "33%" }}></div>
      </div>
      <div className="p-4 sm:p-5 bg-[#08252B] rounded-2xl border-[1px] border-[#07373F]">
        <div className="gradientBg text-center py-3 px-3 sm:px-0 rounded-2xl border-[1px] border-[#07373F]">
          <p className="road-rage-regular text-4xl sm:text-6xl">Techember Fest &apos;&apos;25</p>
          <p className="w-[80%] sm:w-[50%] mx-auto text-sm m-2 font-light">
            Join us for an unforgettable at [Event Name]! Secure your spot now.
          </p>
          <span className="hidden sm:flex flex-row justify-center items-center text-sm mb-1 font-light">
            <img src={locationPin} alt="locationPin" width={15} />
            <p>04 Rumens road, Ikoyi, Lagos || March 15, 2025 | 7:00 PM</p>
          </span>
          <span className="flex sm:hidden flex-col gap-1 justify-center items-center text-xs mb-1 mt-6 font-light" style={{ wordSpacing: '0.2em' }}>
            <span className="flex">
            <img src={locationPin} alt="locationPin" width={15} />
            <p>04 Rumens road, Ikoyi, Lagos</p>
            </span>
            <p>March 15, 2025 | 7:00 PM</p>
          </span>
        </div>
        <div className="loading-bar my-6"></div>
        <p className="text-sm sm:text-base mb-2 font-light">Select Ticket Type:</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-[#041E23] p-3 border rounded-2xl border-[#07373F]">
          {tickets.map((ticket, index) => (
            <button
              key={index}
              className={`cursor-pointer flex flex-col p-2 border-2 rounded-lg transition-all border-[#197686] ${
                selectedTicket?.type === ticket.type
                  ? "bg-[#12464E]"
                  : "bg-[#041E23]"
              }`}
              onClick={() => {
                setSelectedTicket(ticket);
                setTicketError("");
              }}
            >
              <span className="mb-2 font-semibold text-lg">{ticket.price}</span>
              <span className="flex flex-col items-start">
                <span className="text-sm uppercase mb-[2px]">{ticket.type}</span>
                <span className="text-xs">{ticket.amount}/52</span>
              </span>
            </button>
          ))}
        </div>
        {ticketError && <p className="text-red-500 mt-2">{ticketError}</p>}

        <div className="my-4">
          <label className="block text-sm sm:text-base mb-2 font-light">Number of Tickets:</label>
          <Select
            options={quantityOptions}
            value={{ value: quantity, label: quantity.toString() }}
            onChange={(selectedOption) => {
              setQuantity(selectedOption.value);
              setQuantityError("");
            }}
            styles={customStyles}
            menuPlacement="bottom"
          />
          {quantityError && <p className="text-red-500 mt-2">{quantityError}</p>}
        </div>

        {/* Buttons */}
        <div className="JejuMyeongjo text-sm flex flex-col-reverse sm:flex-row justify-between gap-2 sm:gap-0">
          <button
            className="cursor-pointer w-full sm:w-[48%] bg-transparent border-[1px] border-[#24A0B5] text-[#24A0B5] hover:text-white py-3 rounded-lg hover:bg-[#197686]"
            onClick={() => {
              setSelectedTicket(null);
              setQuantity(1);
              setTicketError("");
              setQuantityError("");
            }}
          >
            Cancel
          </button>

          <button
            className="cursor-pointer w-full sm:w-[48%] bg-[#197686] border-[1px] border-[#24A0B5] text-white py-3 rounded-lg hover:bg-transparent"
            onClick={() => {
              let hasError = false;
              if (!selectedTicket) {
                setTicketError("Please select a ticket before proceeding.");
                hasError = true;
              }
              if (quantity < 1) {
                setQuantityError("Please select a valid quantity.");
                hasError = true;
              }
              if (!hasError) {
                navigate("/details");
              }
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketSelection;
