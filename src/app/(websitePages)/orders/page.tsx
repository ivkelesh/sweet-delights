"use client";

/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from "react";
import { ColorPaletteProp } from "@mui/joy/styles";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Chip from "@mui/joy/Chip";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Link from "@mui/joy/Link";
import Input from "@mui/joy/Input";
import Select, { SelectStaticProps } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Table from "@mui/joy/Table";
import Sheet from "@mui/joy/Sheet";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import BlockIcon from "@mui/icons-material/Block";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useEffect, useState } from "react";
import { Container } from "@material-ui/core";
import { Grid, Pagination, Stack } from "@mui/material";
import moment from 'moment';
import CloseRounded from '@mui/icons-material/CloseRounded';
import { Checkbox, List, ListItem } from "@mui/joy";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import NextLink from 'next/link';
import { generateReport, getOrders, exportAsExcel } from "@/utils/httpRequests";
import { OrdersListModel, GetOrdersListModel, GenerateReportModel } from "@/utils/interfaces";
import { IntegerToEnum } from "@/utils/enums";
import ReportPopup from "@/components/ReportPopup/ReportPopup";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import {
  experimental_extendTheme as materialExtendTheme,
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  THEME_ID as MATERIAL_THEME_ID,
} from '@mui/material/styles';
import { CssVarsProvider as JoyCssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/material/CssBaseline';

const materialTheme = materialExtendTheme();

export default function OrderTable() {
  const [columnForSorting, setColumnForSorting] = useState<string>('id');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | undefined>('desc');
  const [pageCount, setPageCount] = useState<number>(1);

  const [orders, setOrders] = useState<OrdersListModel[]>([]);
  const [filter, setFilter] = useState<GetOrdersListModel>({
    pageSize: 10,
    pageNumber: 1,
    ascending: false,
    id: undefined,
    productTypes: [],
    locality: '',
    deliveryType: undefined,
    status: undefined,
    deliveryDateFrom: undefined,
    deliveryDateTo: undefined,
    orderDateFrom: undefined,
    orderDateTo: undefined,
    sort: 'id',
  });

  const action: SelectStaticProps['action'] = React.useRef(null);
  const [selectedProductTypes, setSelectedProductTypes] = useState<number[]>([]);
  const [orderIdInput, setOrderIdInput] = useState<string>('');
  const [isPopupOpen, setPopupOpen] = useState(false);

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  const handleDownloadClick = async (reportModel: GenerateReportModel) => {
      console.log('ReportType:', reportModel.reportType);
      console.log('Selected Date:', reportModel.reportDate);
      console.log('Selected Date From:', reportModel.dateFrom);
      console.log('Selected Date To:', reportModel.dateTo);
      await generateReport(reportModel);
  };

  const handleReportClick = () => {
    setPopupOpen(true);
  };

  const handleChangeOrderId = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    console.log(input);
    if (/^\d*$/.test(input)) {
      setOrderIdInput(input);
      setFilter((prevFilter) => ({
        ...prevFilter,
        id: input === '' ? undefined : +input,
        pageNumber: 1,
      }));
    }
  };

  const fetchCakes = async () => {
    const res = await getOrders(filter);
    const data = await res.json().catch((e) => console.log('Error: ', e.message));
    setOrders(data.items);
    setPageCount(data.pageCount);
  };

  useEffect(() => {
    fetchCakes();
  }, [filter]);

  const handleChangeSort = (column: string) => {
    const isAsc = columnForSorting === column && sortDirection === 'asc';
    setColumnForSorting(column);
    setSortDirection(isAsc ? 'desc' : 'asc');
    setFilter((prevFilter) => ({ ...prevFilter, sort: column, ascending: !isAsc, pageNumber: 1 }));
  };

  const handleChangePageSize = (event: React.ChangeEvent<unknown>, value: number) => {
    setFilter((prevFilter) => ({ ...prevFilter, pageSize: value, pageNumber: 1 }));
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setFilter((prevFilter) => ({ ...prevFilter, pageNumber: value }));
  };

const handleChangeFilter = (filterName: string, value: any) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      [filterName]: value,
      pageNumber: 1,
    }));
  };

  const handleClearFilter = (filterName: string) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      [filterName]: null,
      pageNumber: 1,
    }));
  };

  const handleProductTypeChange = (value: number) => {
    setSelectedProductTypes((prevSelected) => {
      if (prevSelected.includes(value)) {
        return prevSelected.filter((type) => type !== value);
      } else {
        return [...prevSelected, value];
      }
    });
  };

  useEffect(() => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      productTypes: selectedProductTypes,
      pageNumber: 1,
    }));
  }, [selectedProductTypes]);

  const handleExportClick = async () => {
    await exportAsExcel(filter);
  };

  const renderFilters = () => (
    <React.Fragment>
      <FormControl size="sm">
        <FormLabel>Status</FormLabel>
        <Select
          size="sm"
          placeholder="All"
          value={filter.status}
          action={action}
          slotProps={{ button: { sx: { whiteSpace: "nowrap" } } }}
          onChange={(e, newValue) => handleChangeFilter('status', newValue)}
          sx={{
            "& .MuiSvgIcon-root": {
              fontSize: "18px",
            },
            "& .MuiSelect-root": {
              verticalAlign: "top",
            },
          }}
          {...(filter.status != null && {
            endDecorator: (
              <IconButton
                variant="plain"
                color="neutral"
                onMouseDown={(event) => {
                  event.stopPropagation();
                }}
                onClick={() => {
                  handleClearFilter('status');
                  action.current?.focusVisible();
                }}
              >
                <CloseRounded/>
              </IconButton>
            ),
            indicator: null,
          })}
        >
          <Option value={0}>New</Option>
          <Option value={1}>Processed</Option>
          <Option value={2}>In Progress</Option>
          <Option value={3}>Ready</Option>
          <Option value={4}>Delivered</Option>
          <Option value={5}>Rejected</Option>
        </Select>
      </FormControl>

      <FormControl size="sm" sx={{ maxWidth: 40 }}>
        <FormLabel>Product Type</FormLabel>
        <Select
          size="sm"
          placeholder={filter.productTypes.length > 0 ? filter.productTypes.map((pt) => (IntegerToEnum.ProductType[pt] + ',')) : 'All'}
          slotProps={{ button: { sx: { whiteSpace: "nowrap" } } }}
        >
            <List>
                <ListItem variant="plain" sx={{ borderRadius: 'sm' }}>
                    <Checkbox
                        label="Cake"
                        value={0}
                        checked={selectedProductTypes.includes(0)}
                        onChange={(event) => handleProductTypeChange(0)}
                    />
                </ListItem>
                <ListItem variant="plain" sx={{ borderRadius: 'sm' }}>
                    <Checkbox
                        label="Cheesecake"
                        value={1}
                        checked={selectedProductTypes.includes(1)}
                        onChange={(event) => handleProductTypeChange(1)}
                    />
                </ListItem>
                <ListItem variant="plain" sx={{ borderRadius: 'sm' }}>
                    <Checkbox
                        label="Macarons"
                        value={2}
                        checked={selectedProductTypes.includes(2)}
                        onChange={(event) => handleProductTypeChange(2)}
                    />
                </ListItem>
                <ListItem variant="plain" sx={{ borderRadius: 'sm' }}>
                    <Checkbox
                        label="Cupcake"
                        value={3}
                        checked={selectedProductTypes.includes(3)}
                        onChange={(event) => handleProductTypeChange(3)}
                    />
                </ListItem>
            </List>
            <Button
                variant="outlined"
                color="neutral"
                size="sm"
                onClick={() =>
                setSelectedProductTypes([])
                }
                sx={{ px: 3, mt: 1 }}
            >
                Clear All
            </Button>
        </Select>
      </FormControl>

      <FormControl size="sm">
        <FormLabel>Delivery Type</FormLabel>
        <Select 
            size="sm"
            placeholder="All"
            value={filter.deliveryType}
            action={action}
            onChange={(e, newValue) => handleChangeFilter('deliveryType', newValue)}
            sx={{
                "& .MuiSvgIcon-root": {
                fontSize: "18px",
                },
                "& .MuiSelect-root": {
                verticalAlign: "top",
                },
            }}
            {...(filter.deliveryType != null && {
                endDecorator: (
                <IconButton
                    variant="plain"
                    color="neutral"
                    onMouseDown={(event) => {
                    event.stopPropagation();
                    }}
                    onClick={() => {
                    handleClearFilter('deliveryType');
                    action.current?.focusVisible();
                    }}
                >
                    <CloseRounded/>
                </IconButton>
                ),
                indicator: null,
            })}
        >
          <Option value={0}>Pickup</Option>
          <Option value={1}>Courier Delivery</Option>
        </Select>
      </FormControl>

      <FormControl size="sm">
        <FormLabel>Locality</FormLabel>
        <Select 
            size="sm" 
            placeholder="All"
            value={filter.locality}
            action={action}
            onChange={(e, newValue) => handleChangeFilter('locality', newValue)}
            sx={{
                "& .MuiSvgIcon-root": {
                fontSize: "18px",
                },
                "& .MuiSelect-root": {
                verticalAlign: "top",
                },
            }}
            {...(filter.locality != null && {
                endDecorator: (
                <IconButton
                    variant="plain"
                    color="neutral"
                    onMouseDown={(event) => {
                    event.stopPropagation();
                    }}
                    onClick={() => {
                    handleClearFilter('locality');
                    action.current?.focusVisible();
                    }}
                >
                    <CloseRounded/>
                </IconButton>
                ),
                indicator: null,
            })}
        >
          <Option value="Chisinau">Chisinau</Option>
          <Option value="Balti">Balti</Option>
          <Option value="Ceadir-Lunga">Ceadir-Lunga</Option>
          <Option value="Comrat">Comrat</Option>
        </Select>
      </FormControl>
      
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <FormControl size="sm" sx={{ maxWidth: 40 }}>
          <FormLabel>Delivery Date From</FormLabel>
            <DatePicker
              sx={{
                width: '100%',
                '& .MuiInputBase-root': {
                  height: '32px',
                },
                '& .MuiInputBase-input': {
                  fontSize: '0.72rem',
                },
              }}
              slotProps={{
                field: { clearable: true },
              }}
              value={filter.deliveryDateFrom}
              onChange={(newValue) => handleChangeFilter('deliveryDateFrom', newValue)}
              format="DD-MM-YYYY"
            />
        </FormControl>

        <FormControl size="sm" sx={{ maxWidth: 40 }}>
          <FormLabel>Delivery Date To</FormLabel>
            <DatePicker
              sx={{
                width: '100%',
                '& .MuiInputBase-root': {
                  height: '32px',
                },
                '& .MuiInputBase-input': {
                  fontSize: '0.72rem',
                },
              }}
              slotProps={{
                field: { clearable: true },
              }}
              value={filter.deliveryDateTo}
              onChange={(newValue) => handleChangeFilter('deliveryDateTo', newValue)}
              format="DD-MM-YYYY"
            />
        </FormControl>
      </LocalizationProvider>
    </React.Fragment>
  );

  return (
    <MaterialCssVarsProvider theme={{ [MATERIAL_THEME_ID]: materialTheme }}>
      <JoyCssVarsProvider>
        <CssBaseline enableColorScheme />

        <React.Fragment>
          <Container maxWidth="lg" style={{ marginTop: '10rem', marginBottom: '4rem' }}>
            <Box
              sx={{
                display: "flex",
                mb: 5,
                gap: 1,
                flexDirection: { xs: "column", sm: "row" },
                alignItems: { xs: "start", sm: "center" },
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              <Typography level="h2" component="h1">
                Orders
              </Typography>
              <Box sx={{ order: { xs: 0, sm: 1 }, ml: { sm: 1 } }}>
                <Button color="primary" startDecorator={<DownloadRoundedIcon />} size="sm" onClick={handleReportClick}>
                  Generate Report
                </Button>
                <Button 
                  color="primary" 
                  startDecorator={<DownloadRoundedIcon />} 
                  size="sm" 
                  sx={{ ml: 5 }}
                  onClick={handleExportClick}
                  >
                    Export as Excel
                </Button>
              </Box>
            </Box>
            <ReportPopup isOpen={isPopupOpen} onClose={handleClosePopup} onDownloadClick={handleDownloadClick} />
            <Box
                className="SearchAndFilters-tabletUp"
                sx={{
                borderRadius: "sm",
                py: 2,
                display: { xs: "none", sm: "flex" },
                flexWrap: "wrap",
                gap: 1.5,
                "& > *": {
                    minWidth: { xs: "120px", md: "160px" },
                },
                }}
            >
                <FormControl sx={{ flex: 1 }} size="sm">
                <FormLabel>Search by Order Number</FormLabel>
                <Input
                  size="sm"
                  placeholder="Search"
                  startDecorator={<SearchIcon />}
                  value={orderIdInput}
                  onChange={handleChangeOrderId}
                />
                </FormControl>
                {renderFilters()}
            </Box>
            <Sheet
                className="OrderTableContainer"
                variant="outlined"
                sx={{
                display: { xs: "none", sm: "initial" },
                width: "100%",
                borderRadius: "sm",
                flexShrink: 1,
                overflow: "auto",
                minHeight: 0,
                }}
            >
                <Table
                aria-labelledby="tableTitle"
                stickyHeader
                hoverRow
                sx={{
                    "--TableCell-headBackground":
                    "var(--joy-palette-background-level1)",
                    "--Table-headerUnderlineThickness": "1px",
                    "--TableRow-hoverBackground":
                    "var(--joy-palette-background-level1)",
                    "--TableCell-paddingY": "4px",
                    "--TableCell-paddingX": "8px",
                }}
                >
                <thead>
                    <tr>
                    <th style={{ width: 140, padding: "12px 6px" }}>
                        <Link
                        underline="none"
                        color="primary"
                        component="button"
                        onClick={() => handleChangeSort('id')}
                        fontWeight="lg"
                        endDecorator={<ArrowDropDownIcon />}
                        sx={{
                            "& svg": {
                            transition: "0.2s",
                            transform:
                            sortDirection === "desc" ? "rotate(0deg)" : "rotate(180deg)",
                            },
                        }}
                        >
                        Order Number
                        </Link>
                    </th>
                    <th style={{ width: 140, padding: "12px 6px" }}>
                        <Link
                        underline="none"
                        color="primary"
                        component="button"
                        onClick={() => handleChangeSort('product.productType')}
                        fontWeight="lg"
                        endDecorator={<ArrowDropDownIcon />}
                        sx={{
                            "& svg": {
                            transition: "0.2s",
                            transform:
                            sortDirection === "desc" ? "rotate(0deg)" : "rotate(180deg)",
                            },
                        }}
                        >
                        Product Type
                        </Link>
                    </th>
                    <th style={{ width: 140, padding: "12px 6px" }}>
                        <Link
                        underline="none"
                        color="primary"
                        component="button"
                        onClick={() => handleChangeSort('status')}
                        fontWeight="lg"
                        endDecorator={<ArrowDropDownIcon />}
                        sx={{
                            "& svg": {
                            transition: "0.2s",
                            transform:
                            sortDirection === "desc" ? "rotate(0deg)" : "rotate(180deg)",
                            },
                        }}
                        >
                        Status
                        </Link>
                    </th>
                    <th style={{ width: 140, padding: "12px 6px" }}>
                        <Link
                        underline="none"
                        color="primary"
                        component="button"
                        onClick={() => handleChangeSort('locality')}
                        fontWeight="lg"
                        endDecorator={<ArrowDropDownIcon />}
                        sx={{
                            "& svg": {
                            transition: "0.2s",
                            transform:
                            sortDirection === "desc" ? "rotate(0deg)" : "rotate(180deg)",
                            },
                        }}
                        >
                        Locality
                        </Link>
                    </th>
                    <th style={{ width: 140, padding: "12px 6px" }}>
                        <Link
                        underline="none"
                        color="primary"
                        component="button"
                        onClick={() => handleChangeSort('deliveryType')}
                        fontWeight="lg"
                        endDecorator={<ArrowDropDownIcon />}
                        sx={{
                            "& svg": {
                            transition: "0.2s",
                            transform:
                            sortDirection === "desc" ? "rotate(0deg)" : "rotate(180deg)",
                            },
                        }}
                        >
                        Delivery Type
                        </Link>
                    </th>
                    <th style={{ width: 140, padding: "12px 6px" }}>
                        <Link
                        underline="none"
                        color="primary"
                        component="button"
                        onClick={() => handleChangeSort('deliveryDate')}
                        fontWeight="lg"
                        endDecorator={<ArrowDropDownIcon />}
                        sx={{
                            "& svg": {
                            transition: "0.2s",
                            transform:
                            sortDirection === "desc" ? "rotate(0deg)" : "rotate(180deg)",
                            },
                        }}
                        >
                        Delivery Date
                        </Link>
                    </th>
                    <th style={{ width: 140, padding: "12px 6px" }}>
                        <Link
                        underline="none"
                        color="primary"
                        component="button"
                        fontWeight="lg"
                        >
                        Delivery Time
                        </Link>
                    </th>
                    <th style={{ width: 140, padding: "12px 6px" }}>
                        <Link
                        underline="none"
                        color="primary"
                        component="button"
                        onClick={() => handleChangeSort('totalPrice')}
                        fontWeight="lg"
                        endDecorator={<ArrowDropDownIcon />}
                        sx={{
                            "& svg": {
                            transition: "0.2s",
                            transform:
                            sortDirection === "desc" ? "rotate(0deg)" : "rotate(180deg)",
                            },
                        }}
                        >
                        Total Price
                        </Link>
                    </th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((row) => (
                    <tr key={row.id}>
                        <td>
                          <NextLink href={`/orders/${row.id}`}>
                              <p>
                                  <Typography level="body-xs">{row.id}</Typography>
                              </p>
                          </NextLink>
                        </td>
                        <td>
                            <Typography level="body-xs">{IntegerToEnum.ProductType[row.productType]}</Typography>
                        </td>
                        <td>
                            <Chip
                                variant="soft"
                                size="sm"
                                startDecorator={
                                {
                                    Processed: <CheckRoundedIcon />,
                                    New: <AddCircleOutlineIcon />,
                                    Rejected: <BlockIcon />,
                                }[IntegerToEnum.OrderStatus[row.status]]
                                }
                                color={
                                {
                                    Processed: "success",
                                    New: "primary",
                                    Rejected: "danger",
                                }[IntegerToEnum.OrderStatus[row.status]] as ColorPaletteProp
                                }
                            >
                                {IntegerToEnum.OrderStatus[row.status]}
                            </Chip>
                        </td>
                        <td>
                            <Typography level="body-xs">{row.locality}</Typography>
                        </td>
                        <td>
                            <Typography level="body-xs">{IntegerToEnum.DeliveryType[row.deliveryType]}</Typography>
                        </td>
                        <td>
                            <Typography level="body-xs">
                                {moment(row.deliveryDate).format('DD MMMM, YYYY')}
                            </Typography>
                        </td>
                        <td>
                            <Typography level="body-xs">
                                {moment(row.deliveryDate).format('HH:mm')}
                            </Typography>
                        </td>
                        <td>
                            <Typography level="body-xs">{row.totalPrice} MDL</Typography>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </Table>
            </Sheet>
            <Box>
              <Grid container justifyContent="center" alignItems="center" spacing={5}>
                <Grid item>
                  <Stack spacing={2}>
                    <Pagination count={pageCount} page={filter.pageNumber} onChange={handlePageChange} variant="outlined" color="primary" />
                  </Stack>
                </Grid>
                <Grid item>
                    <FormControl size="sm">
                        <Grid container alignItems="center" spacing={2}>
                            <Grid item>
                                <FormLabel>Rows per page:</FormLabel>
                            </Grid>
                            <Grid item>
                                <Select
                                size="sm"
                                value={filter.pageSize}
                                onChange={handleChangePageSize}
                                >
                                    <Option value={10}>10</Option>
                                    <Option value={20}>20</Option>
                                    <Option value={50}>50</Option>
                                    <Option value={100}>100</Option>
                                </Select>
                            </Grid>
                        </Grid>
                    </FormControl>
                </Grid>
              </Grid>
            </Box>
            
          </Container>
        </React.Fragment>
      </JoyCssVarsProvider>
    </MaterialCssVarsProvider>
  );
}
