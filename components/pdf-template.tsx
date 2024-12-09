import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import type { WeighBridgeForm } from '../types/form';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: 'Helvetica',
  },
  receiptContainer: {
    marginBottom: 40,
  },
  header: {
    marginBottom: 10,
    textAlign: 'center',
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 10,
    marginTop: 2,
  },
  approval: {
    fontSize: 10,
    marginTop: 2,
  },
  dottedLine: {
    borderBottom: '1px dotted #000',
    marginVertical: 5,
  },
  row: {
    flexDirection: 'row',
    marginVertical: 2,
  },
  column: {
    flex: 1,
    flexDirection: 'row',
  },
  label: {
    width: 100,
    textTransform: 'uppercase',
  },
  colon: {
    width: 8,
    marginRight: 2,
  },
  value: {
    flex: 1,
  },
  centerText: {
    textAlign: 'center',
    marginVertical: 2,
  },
  weightRow: {
    flexDirection: 'row',
    marginVertical: 2,
  },
  weightLabel: {
    width: 100,
    textTransform: 'uppercase',
  },
  weightValue: {
    width: 80,
  },
  weightDateTime: {
    flex: 1,
    textAlign: 'right',
  },
  signature: {
    marginTop: 10,
    textTransform: 'uppercase',
  },
});

interface PDFTemplateProps {
  data: WeighBridgeForm;
}

const Receipt = ({ data }: PDFTemplateProps) => (
  <View style={styles.receiptContainer}>
    {/* Header Section */}
    <View style={styles.header}>
      <Text style={styles.title}>MAA TARA COMPUTERISED WEIGH BRIDGE</Text>
      <Text style={styles.subtitle}>BANSARA, MORE, RANIGANJ, (WEST BENGAL)</Text>
      <Text style={styles.approval}>CAP.80MT APPROVED BY GOVT. WEST BENGAL (INDIA)</Text>
    </View>

    <View style={styles.dottedLine} />

    {/* Details Section */}
    <View style={styles.row}>
      <View style={styles.column}>
        <Text style={styles.label}>Serial No.</Text>
        <Text style={styles.colon}>:</Text>
        <Text style={styles.value}>{data.serialNo}</Text>
      </View>
      <View style={styles.column}>
        <Text style={styles.label}>Vech. No.</Text>
        <Text style={styles.colon}>:</Text>
        <Text style={styles.value}>{data.vehicleNo}</Text>
      </View>
      <View style={styles.column}>
        <Text style={styles.label}>Vech. Type</Text>
        <Text style={styles.colon}>:</Text>
        <Text style={styles.value}>{data.vehicleType}</Text>
      </View>
    </View>

    <View style={styles.row}>
      <View style={styles.column}>
        <Text style={styles.label}>Charges</Text>
        <Text style={styles.colon}>:</Text>
        <Text style={styles.value}>{data.charges} /-</Text>
      </View>
      <View style={styles.column}>
        <Text style={styles.label}>Material</Text>
        <Text style={styles.colon}>:</Text>
        <Text style={styles.value}>{data.material}</Text>
      </View>
      <View style={styles.column}>
        <Text style={styles.label}>Party Ref.</Text>
        <Text style={styles.colon}>:</Text>
        <Text style={styles.value}>{data.partyRef}</Text>
      </View>
    </View>

    <View style={styles.row}>
      <View style={styles.column}>
        <Text style={styles.label}>Payment</Text>
        <Text style={styles.colon}>:</Text>
        <Text style={styles.value}>{data.payment}</Text>
      </View>
      <View style={styles.column}>
        {/* Empty middle column */}
      </View>
      <View style={styles.column}>
        <Text style={styles.label}>Driver</Text>
        <Text style={styles.colon}>:</Text>
        <Text style={styles.value}>{data.driver}</Text>
      </View>
    </View>

    <Text style={styles.centerText}>{data.inDate}</Text>

    {/* Weight Section */}
    <View>
      <View style={styles.weightRow}>
        <Text style={styles.weightLabel}>Gross Weight</Text>
        <Text style={styles.colon}>:</Text>
        <Text style={styles.weightValue}>{data.grossWeight} Kg</Text>
        <Text style={styles.centerText}>
          {data.inDate}, {data.inTime}
        </Text>
      </View>
      <View style={styles.weightRow}>
        <Text style={styles.weightLabel}>Tare Weight</Text>
        <Text style={styles.colon}>:</Text>
        <Text style={styles.weightValue}>{data.tareWeight} Kg</Text>
        <Text style={styles.centerText}>
          {data.outDate}, {data.outTime}
        </Text>
      </View>
      <View style={styles.weightRow}>
        <Text style={styles.weightLabel}>Net Weight</Text>
        <Text style={styles.colon}>:</Text>
        <Text style={styles.weightValue}>{data.netWeight} Kg</Text>
      </View>
    </View>

    <View style={styles.dottedLine} />

    {/* Signature Section */}
    <Text style={styles.signature}>Operators Signature:</Text>
    <View style={styles.dottedLine} />
  </View>
);

export function PDFTemplate({ data }: PDFTemplateProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {[...Array(3)].map((_, index) => (
          <Receipt data={data} key={index} />
        ))}
      </Page>
    </Document>
  );
}
