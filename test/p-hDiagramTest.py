import matplotlib.pyplot as plt
import pandas as pd
import csv
import numpy as np


filename = '../test/phdata/Book1.csv'

df = pd.read_csv(filename)

pressure = df.loc[:,"Pressure[kPa(abs)]"]
enthalpy_l = df.loc[:,"Enthalpy[kJ/kg]_Liquidhf"]
enthalpy_la = df.loc[:,"Enthalpy[kJ/kg]_Latenthfg"]
enthalpy_v = df.loc[:,"Enthalpy[kJ/kg]_Vaporhg"]
volume_l = df.loc[:,"Volume[m3/kg]_Liquidvf"]
volume_v = df.loc[:,"Entropy[kJ/(kg)(K)]_Liquidsf"]
entropy_l = df.loc[:,"Volume[m3/kg]_Liquidvf"]
entropy_v = df.loc[:,"Entropy[kJ/(kg)(K)]_Vaporsg"]

plt.plot(enthalpy_l,pressure,"r-",label="pressure_enthalpy_l")
plt.plot(enthalpy_v,pressure,"c-",label="pressure_enthalpy_v")
plt.ylabel("pressure")
plt.xlabel("enthalpy_v")
# plt.plot(enthalpy_la,pressure,"g-",label="measured_theta")
# plt.ylabel("pressure")
# plt.xlabel("enthalpy_la")

# plt.plot(volume_l,pressure,"c-",label="pressure_volume_l")
# plt.plot(volume_v,pressure,"r-",label="measured_theta")
# plt.plot(enthalpy_l,entropy_l,"c-",label="pressure_entropy_l")



# # read excel file of experiment data, data with indicator and data without indicator
# # filename= "E:\Project2023\pHModelTest\data\experimentRecords.xlsx"
# filename1 = "./data/freon 134a si thermodynamic properties.xlsx"
# dataExperiment_withIndicator = pd.read_excel(io=filename1,sheet_name="withIndicator")
# dataExperiment_noIndicator = pd.read_excel(io=filename1,sheet_name="withoutIndicator")

# # variables for the experiment data test
# V_withI = []
# pH_withI = []
# V_noI = []
# pH_noI = []

# # read the data from experiment data
# V_withI = dataExperiment_withIndicator.iloc[:94,3]
# pH_withI = dataExperiment_withIndicator.iloc[:94,4]
# V_noI = dataExperiment_noIndicator.iloc[:94,3]
# pH_noI = dataExperiment_noIndicator.iloc[:94,4]

# # pH deviation between the twp experiments, the volume is the same 
# pH_deviation = pH_noI - pH_withI


# # plot two experiment curve 
# plt.plot(V_withI-5,pH_withI,color ="tab:blue",label="withIndicator")
# plt.plot(V_noI,pH_noI,color ="tab:red",label="withoutIndicator")
# plt.xlabel("volume/ml")
# plt.ylabel("pH")



# plt.savefig("../img/pend00-run00-angle.png", dpi=300)
plt.legend()
# # plt.show()
# # plt.close()

# # Assuming 'pressure' is a list of pressure values and 'enthalpy' is a list of enthalpy values
# pressure = [0.57, 0.63, 0.7, 0.77, 0.86, 0.95, 1.04, 1.15, 1.27, 1.4, 1.53, 1.68, 1.84, 2.02, 2.2, 2.41, 2.63,
#     2.86, 3.11, 3.39, 3.68, 3.99, 4.33, 4.69, 5.07, 5.48, 5.92, 6.39, 6.89, 7.42, 7.98, 8.58, 9.22,
#     9.89, 10.61, 11.37, 12.18, 13.03, 13.93, 14.88, 15.89, 16.95, 18.07, 19.25, 20.49, 21.8, 23.17,
#     24.62, 26.14, 27.73, 29.41, 31.16, 33, 34.93, 36.95, 39.06, 41.27, 43.58, 45.99, 48.51, 51.14,
#     53.88, 56.74, 59.72, 62.83, 66.07, 69.43, 72.93, 76.58, 80.36, 84.29, 88.37, 92.61, 97.02, 101.58,
#     106.32, 111.22, 116.31, 121.57, 127.02, 132.67, 138.5, 144.54, 150.78, 157.23, 163.9, 170.78,
#     177.89, 185.22, 192.79, 200.6, 208.65, 216.95, 225.5, 234.32, 243.39, 252.74, 262.36, 272.26,
#     282.45, 292.93, 303.7, 314.77, 326.16, 337.85, 349.87, 362.21, 374.88, 387.88, 401.23, 414.92,
#     428.97, 443.37, 458.11, 473.25, 488.78, 504.68, 520.98, 537.67, 554.76, 572.25, 590.16, 608.49,
#     627.25, 646.44, 666.06, 686.13, 706.66, 727.64, 749.04, 771.02, 793.43, 816.28, 839.66, 863.53,
#     887.91, 912.8, 938.2, 964.14, 990.6, 1017.61, 1045.16, 1073.26, 1101.93, 1131.16, 1161.01,
#     1191.41, 1222.41, 1253.95, 1286.17, 1319, 1352.44, 1386.52, 1421.23, 1456.58, 1492.59, 1529.26,
#     1566.61, 1604.63, 1643.35, 1682.76, 1722.88, 1763.72, 1805.28, 1847.47, 1890.54, 1934.36, 1978.94,
#     2024.28, 2070.42, 2117.34, 2165.08, 2213.63, 2263.01, 2313.23, 2364.31, 2416.25, 2469.08, 2522.79,
#     2577.42, 2632.97, 2689.46, 2746.9, 2805.31, 2864.7, 2925.11, 2986.54, 3049.01, 3112.55, 3177.1,
#     3242.87, 3309.78, 3377.85, 3447.13, 3517.65, 3589.44, 3662.57, 3737.09, 3813.08, 3890.64, 3969.94,
#     4051.35]  # Your full list of pressure values
# enthalpy = [77.3, 78.4, 79.6, 80.7, 81.9, 83, 84.2, 85.3, 86.5, 87.6, 88.8, 89.9, 91.1, 92.3, 93.4, 94.6,
#     95.7, 96.9, 98, 99.2, 100.4, 101.5, 102.7, 103.9, 105, 106.2, 107.4, 108.6, 109.7, 110.9, 112.1,
#     113.3, 114.5, 115.6, 116.8, 118, 119.2, 120.4, 121.6, 122.8, 124, 125.2, 126.4, 127.6, 128.8,
#     130, 131.2, 132.4, 133.7, 134.9, 136.1, 137.3, 138.5, 139.8, 141, 142.2, 143.5, 144.7, 145.9,
#     147.2, 148.4, 149.6, 150.9, 152.1, 153.4, 154.6, 155.9, 157.1, 158.4, 159.7, 160.9, 162.2, 163.5,
#     164.7, 166, 167.3, 168.6, 169.8, 171.1, 172.4, 173.7, 175, 176.3, 177.6, 178.9, 180.2, 181.5,
#     182.8, 184.1, 185.4, 186.7, 188, 189.3, 190.7, 192, 193.3, 194.6, 196, 197.3, 198.7, 200, 201.3,
#     202.7, 204, 205.4, 206.8, 208.1, 209.5, 210.8, 212.2, 213.6, 215, 216.4, 217.7, 219.1, 220.5,
#     221.9, 223.3, 224.7, 226.1, 227.5, 228.9, 230.4, 231.8, 233.2, 234.6, 236.1, 237.5, 238.9, 240.4,
#     241.8, 243.3, 244.8, 246.2, 247.7, 249.2, 250.6, 252.1, 253.6, 255.1, 256.6, 258.1, 259.6, 261.1,
#     262.7, 264.2, 265.7, 267.3, 268.8, 270.4, 271.9, 273.5, 275.1, 276.6, 278.2, 279.8, 281.4, 283,
#     284.6, 286.3, 287.9, 289.5, 291.2, 292.9, 294.5, 296.2, 297.9, 299.6, 301.3, 303, 304.8, 306.5,
#     308.3, 310.1, 311.8, 313.7, 315.5, 317.3, 319.2, 321, 322.9, 324.9, 326.8, 328.8, 330.7, 332.8,
#     334.8, 336.9, 339, 341.2, 343.4, 345.7, 348, 350.4, 353, 355.6, 358.4, 361.3, 364.6, 368.4, 373.2,
#     383]  # Your full list of enthalpy values
# temperature = list(range(-100, 102)) 

# Create a DataFrame
# df = pd.DataFrame({
#     'Pressure': pressure,
#     # 'Enthalpy': enthalpy,
#     'temperature': temperature,
# })

# # Plotting the diagram
# plt.plot(df['temperature'], df['Pressure'])
# # plt.xlabel('Enthalpy (kJ/kg)')
# plt.xlabel("temperature")
# plt.ylabel('Pressure (kPa)')
plt.title('Pressure-Enthalpy Diagram')
plt.grid(True)
plt.show()



