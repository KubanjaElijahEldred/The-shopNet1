import qrcode
import os

def generate_qr_codes():
    """Generate QR codes for different hospital departments"""
    
    base_url = "http://localhost:3002"
    
    # QR codes for different departments
    departments = [
        ('emergency', 'Emergency Department'),
        ('pharmacy', 'Pharmacy'),
        ('reception', 'Reception'),
        ('laboratory', 'Laboratory'),
        ('radiology', 'Radiology'),
        ('ward', 'Ward'),
        ('outpatient', 'Outpatient'),
    ]
    
    # Create QR codes directory
    os.makedirs('qr_codes', exist_ok=True)
    
    for dept_code, dept_name in departments:
        # Create URL with department pre-selected
        url = f"{base_url}?department={dept_code}"
        
        # Generate QR code
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_L,
            box_size=10,
            border=4,
        )
        qr.add_data(url)
        qr.make(fit=True)
        
        # Create QR code image
        img = qr.make_image(fill_color="black", back_color="white")
        
        # Save QR code
        filename = f"qr_codes/{dept_name.lower().replace(' ', '_')}_feedback.png"
        img.save(filename)
        
        print(f"Generated QR code for {dept_name}: {filename}")
        print(f"URL: {url}")
        print()

if __name__ == "__main__":
    generate_qr_codes()
    print("All QR codes generated successfully!")
    print("\nInstructions:")
    print("1. Print the QR codes and place them in respective departments")
    print("2. Patients can scan to access the feedback form")
    print("3. The department will be pre-selected in the form")
