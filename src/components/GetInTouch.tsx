"use client";
import React, { useState } from "react";
import {
  Flex,
  Text,
  Button,
  Icon,
  Input,
  Textarea,
  Spinner,
} from "@/once-ui/components";
import { Dialog } from "@/once-ui/components/Dialog";
import emailjs from "@emailjs/browser";
import styles from "@/components/about/about.module.scss";

const GetInTouch: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // State for form inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // State for email validation
  const [emailError, setEmailError] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [buttonText, setButtonText] = useState("Send Message"); // Button text state

  const handleOpenDialog = () => setIsDialogOpen(true);
  const handleCloseDialog = () => setIsDialogOpen(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    // Email validation regex
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError(""); // Clear error if valid
    }
  };
  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    setIsSending(true);
    setButtonText("Sending...");
    emailjs
      .send(
        "service_djs7qpj", // Access Service ID from env
        "template_h5fi9uh", // Access Template ID from env
        {
          from_name: name,
          from_email: email,
          message: message,
          to_name: "Mahesh",
        },
        "jt91QyKUo-Emqqs2E" // Access Public Key from env
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          setButtonText("Message Sent"); // Change button text to "Message Sent"
          setIsSending(false);

          // Reset form fields and close dialog after a delay
          setTimeout(() => {
            setName("");
            setEmail("");
            setMessage("");
            setButtonText("Send Message"); // Reset button text
            setIsDialogOpen(false); // Close the dialog
          }, 1500); // Close the dialog after 1.5 seconds
        },
        (error) => {
          console.error("FAILED...", error);
          setButtonText("Send Message"); // Reset button text on failure
          setIsSending(false);
        }
      );
  };

  return (
    <Flex fitWidth vertical="center" horizontal="center" gap="m">
      {/* Button to Open Dialog */}
      <Button
        onClick={handleOpenDialog}
        variant="secondary"
        size="m"
        style={{ background: "var(--brand-alpha-weak)" }}
      >
        <Flex vertical="center" horizontal="center">
          <Text variant="body-default-m" style={{ lineHeight: "1" }}>
            Get in Touch
          </Text>
          <Icon paddingX="4" name="mail" size="m" />
        </Flex>
      </Button>

      {/* Dialog Component */}
      <Dialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        title="Contact Form"
        description="I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Feel free to reach out!"
        footer={
          <Button
            loading={isSending} // Show loading spinner while sending
            disabled={!!emailError || !email || !name || !message || isSending} // Disable if email is invalid or fields are empty
            onClick={handleSendEmail}
          >
            {buttonText} {/* Use children to display the button text */}
          </Button>
        }
        background="brand-weak"
      >
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          {/* Name Input */}
          <label>
            <Input
              id="name"
              label="Name"
              value={name}
              hasPrefix={<Icon name="person" />}
              onChange={(e) => setName(e.target.value)} // Update state on change
            />
          </label>

          {/* Email Input */}
          <label>
            <Input
              id="email"
              label="Email"
              type="email"
              value={email}
              hasPrefix={<Icon name="mail" />}
              onChange={handleEmailChange} // Validate email on change
            />
            {emailError && (
              <Text
                variant="body-default-s"
                style={{ color: "var(--error-color)", marginTop: "0.5rem" }}
              >
                {emailError}
              </Text>
            )}
          </label>

          {/* Message Input */}
          <label>
            <Textarea
              id="message"
              label="Message"
              lines={5}
              resize="vertical"
              value={message}
              onChange={(e) => setMessage(e.target.value)} // Update state on change
            />
          </label>
        </form>
      </Dialog>
    </Flex>
  );
};

export default GetInTouch;
