import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer'
import type { WeighBridgeForm } from '../types/form'

const styles = StyleSheet.create({
  page: {
    padding: 60,
    fontSize: 10,
    fontFamily: 'Helvetica',
  },
  receiptSection: {
    marginBottom: 50,
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
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    borderBottomStyle: 'dotted',
    marginVertical: 5,
  },
  row: {
    flexDirection: 'row',
    marginVertical: 2,
  },
  col3: {
    flex: 1,
    paddingRight: 10,
  },
  label: {
    width: 100,
    fontWeight: 'bold',
  },
  colon: {
    width: 10,
    marginRight: 2,
  },
  value: {
    flex: 1,
  },
  weightRow: {
    flexDirection: 'row',
    marginVertical: 2,
  },
  weightLabel: {
    width: 120,
    fontWeight: 'bold',
  },
  weightValue: {
    width: 80,
  },
  datetime: {
    flex: 1,
    textAlign: 'right',
  },
  signature: {
    marginTop: 10,
  },
  signatureLabel: {
    fontWeight: 'bold',
  },
})

interface PDFTemplateProps {
  data: WeighBridgeForm
}

const Receipt = ({ data }: PDFTemplateProps) => (
  <View style={styles.receiptSection}>
    <View style={styles.header}>
      <Text style={styles.title}>MAA TARA COMPUTERISED WEIGH BRIDGE</Text>
      <Text style={styles.subtitle}>BANSARA, MORE, RANIGANJ, (WEST BENGAL)</Text>
      <Text style={styles.approval}>CAP.80MT APPROVED BY GOVT. WEST BENGAL (INDIA)</Text>
    </View>

    <View style={styles.dottedLine} />

    <View style={styles.row}>
      <View style={styles.col3}>
        <Text>SERIAL NO. : {data.serialNo}</Text>
      </View>
      <View style={styles.col3}>
        <Text>VECH. NO. : {data.vehicleNo}</Text>
      </View>
      <View style={styles.col3}>
        <Text>VECH. TYPE: WHEELER</Text>
      </View>
    </View>

    <View style={styles.row}>
      <View style={styles.col3}>
        <Text>CHARGES : {data.charges}/-</Text>
      </View>
      <View style={styles.col3}>
        <Text>MATERIAL : {data.material}</Text>
      </View>
      <View style={styles.col3}>
        <Text>PARTY REF.: {data.partyRef}</Text>
      </View>
    </View>

    <View style={styles.row}>
      <View style={styles.col3}>
        <Text>PAYMENT : {data.payment}</Text>
      </View>
      <View style={styles.col3}>
        <Text>DRIVER. : {data.driver}</Text>
      </View>
      <View style={styles.col3}>
        <Text>{data.outDate}</Text>
      </View>
    </View>

    <View style={styles.weightRow}>
      <Text style={styles.weightLabel}>GROSS WEIGHT</Text>
      <Text style={styles.colon}>:</Text>
      <Text style={styles.weightValue}>{data.grossWeight} Kg</Text>
      <Text style={styles.datetime}>{data.outDate},{data.outTime}</Text>
    </View>

    <View style={styles.weightRow}>
      <Text style={styles.weightLabel}>TARE WEIGHT</Text>
      <Text style={styles.colon}>:</Text>
      <Text style={styles.weightValue}>{data.tareWeight} Kg</Text>
      <Text style={styles.datetime}>{data.outDate},{data.outTime}</Text>
    </View>

    <View style={styles.weightRow}>
      <Text style={styles.weightLabel}>NET WEIGHT</Text>
      <Text style={styles.colon}>:</Text>
      <Text style={styles.weightValue}>{data.netWeight} Kg</Text>
    </View>

    <View style={styles.dottedLine} />

    <View style={styles.signature}>
      <Text style={styles.signatureLabel}>OPERATOR'S SIGNATURE:</Text>
    </View>

    <View style={styles.dottedLine} />
  </View>
)

export function PDFTemplate({ data }: PDFTemplateProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Receipt data={data} />
        <Receipt data={data} />
        <Receipt data={data} />
      </Page>
    </Document>
  )
}

